// src/service/FileUploadService.ts
import { Worker } from "worker_threads";
import path from "path";

export class FileUploadService {
  public static handleFileUpload(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      //Worker thread with IPC
      const worker = new Worker(
        path.resolve(__dirname, "../threads/index.ts"),
        {
          workerData: { filePath },
          //Dependency Injection
          execArgv: /\.ts$/.test(path.resolve(__dirname, "../threads/index.ts"))
            ? ["--require", "ts-node/register"]
            : undefined,
        }
      );
      //Worker thread process
      worker.on("message", (message) => {
        if (message.success) {
          resolve(message.agents);
        } else {
          reject(new Error(message.error));
        }
      });

      worker.on("error", (error) => {
        reject(error);
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }
}
