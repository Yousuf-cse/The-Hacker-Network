import mongoose from "mongoose";
import { config } from "dotenv";

config();
const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);
const connectDB = async () => {
  try {
    if (mongoURI) {
      const conn = await mongoose.connect(mongoURI, {
        serverSelectionTimeoutMS: 40000,
      });
      console.log(
        `\x1b[34m \x1b[1m \x1b[4mMongoDB Connected: ${mongoURI}\x1b[0m`
      );
    }
  } catch (error: any) {
    throw error;
  }
};

export default connectDB;
