import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectMongoClient } from "../config/mongoClient.js"; 
import "dotenv/config";

const client = await connectMongoClient();

export const auth = betterAuth({
    baseURL : process.env.BETTER_AUTH_BASE_URL,
    database: mongodbAdapter(client.db("shoeStore")),

    emailAndPassword :{
        enabled:true,
        requireEmailVerification:false
    }
});