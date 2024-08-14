import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const dbConnection = await mongoose.connect(
    "mongodb://127.0.0.1:27017/Policy_Managment"
  );

  cachedConnection = dbConnection;
  return dbConnection;
}

export function getDatabaseConnection() {
  if (!cachedConnection) {
    throw new Error("Database connection has not been established.");
  }
  return cachedConnection;
}
