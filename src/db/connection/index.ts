import mongoose from "mongoose";
import dotenv from "dotenv";

let cachedConnection: typeof mongoose | null = null;
dotenv.config();

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const dbConnection = await mongoose.connect(`${process.env.MONGODB_URI}`);

  cachedConnection = dbConnection;
  return dbConnection;
}

export function getDatabaseConnection() {
  if (!cachedConnection) {
    throw new Error("Database connection has not been established.");
  }
  return cachedConnection;
}
