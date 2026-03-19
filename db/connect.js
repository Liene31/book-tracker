import mongoose from "mongoose";

const { DB_CONNECTION } = process.env;
let isConnected = false;

// Checks if already connected to DB
// Otherwise re-connects on every request (GET, POST, DELETE...)
export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(DB_CONNECTION, {
      dbName: "BookTracker",
    });

    isConnected = mongoose.connection.readyState === 1;
    console.log("Connected to DB");
  } catch (error) {
    console.log(`Connection failed with error ${error}`);
  }
};
