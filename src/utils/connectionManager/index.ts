import mongoose from "mongoose";

// Function to handle graceful shutdown
const handleShutdown = async () => {
  try {
    console.log("Shutting down gracefully...");
    await mongoose.disconnect(); // Close MongoDB connection
    console.log("MongoDB connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

const setupShutdownHandlers = () => {
  process.on("SIGINT", async () => {
    console.log("SIGINT signal received.");
    await handleShutdown();
  });

  process.on("SIGTERM", async () => {
    console.log("SIGTERM signal received.");
    await handleShutdown();
  });
};

export default setupShutdownHandlers;
