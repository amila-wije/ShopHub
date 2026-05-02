import "dotenv/config";
import { MongoClient } from "mongodb";

if (!process.env.MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined");
}

const client = new MongoClient(process.env.MONGO_URI);

export const connectMongoClient = async () => {
  if (!client.topology?.isConnected()) {
    await client.connect();
    console.log("✅ MongoClient Connected");
  }
  return client;
};
