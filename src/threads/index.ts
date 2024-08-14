import { parentPort, workerData } from "worker_threads";
import csvParser from "csv-parser";
import fs from "fs";
import mongoose from "mongoose";
import { connectToDatabase } from "../db/connection";
import { Common } from "../utils/common/common";

const { filePath } = workerData;
let cahchedConnection: any;
const processFile = async (filePath: string): Promise<any[]> => {
  if (!cahchedConnection) {
    cahchedConnection = await connectToDatabase();
  }

  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data: any) => results.push(data))
      .on("end", () => {
        //Delay for file upload
        setTimeout(() => {
          try {
            fs.unlinkSync(filePath); // Attempt to delete the file
            console.log(`File deleted successfully.`);
          } catch (error) {
            console.error(`Failed to delete file ${filePath}:`, error);
            reject(error);
          }
          resolve(results);
        }, 100); // Delay deletion by 100ms
      })
      .on("error", (error) => {
        console.error("Error processing file:", error);
        reject(error);
      });
  });
};

const findAgent = async (record: any) => {
  //Db start transcation
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //Get all the repo methods under one hood
    let {
      agentRepo,
      userRepo,
      policyCarriesRepo,
      policyCategoryRepo,
      accountRepo,
      policyRepo,
    } = new Common(record);

    // Handle agent and user creation
    let [
      createdAgent,
      createdUser,
      createdPolicyCarrier,
      createdPolicyCategory,
    ] =
      //Handle db race condition
      await Promise.all([
        agentRepo.CreateAgent(),
        userRepo.CreateUser(),
        policyCarriesRepo.CreatePolicyCarrier(),
        policyCategoryRepo.CreatePolicyCategory(),
      ]);
    let createdAccount = await accountRepo.CreatedAccount(createdUser?.id);
    await policyRepo.CreatePolicy({
      userId: createdUser?.id,
      categoryId: createdPolicyCategory?.id,
      carrierId: createdPolicyCarrier.id,
    });
    await session.commitTransaction();
    session.endSession();

    return {
      agent: createdAgent,
      user: createdUser,
      policyCarrier: createdPolicyCarrier,
      policyCategory: createdPolicyCategory,
      account: createdAccount,
    };
  } catch (error: any) {
    //Db abort transcation
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    throw new Error(
      `Something went wrong, please retry or check the CSV file sent: ${error.message}`
    );
  }
};

//Batch Processing
const processBatches = async (results: any[]) => {
  const BATCH_SIZE = 100; // Adjust batch size as needed
  for (let i = 0; i < results.length; i += BATCH_SIZE) {
    const batch = results.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (data) => findAgent(data)));
  }
};

//IPC Process communication
processFile(filePath)
  .then(async (results) => {
    await processBatches(results);
    if (parentPort) {
      parentPort.postMessage({
        success: true,
        message: "File processed successfully",
      });
    }
  })
  .catch((error) => {
    if (parentPort) {
      parentPort.postMessage({
        success: false,
        error: error.message,
      });
    }
  });
