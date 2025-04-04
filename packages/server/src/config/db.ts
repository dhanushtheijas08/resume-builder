import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "your-mongo-uri";

export async function connectToDatabase() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}
