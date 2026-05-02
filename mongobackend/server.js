import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authroutes from "./routes/auth.routes.js"

import shoeRoutes from "./routes/shoeRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import chatRoute from "./routes/chat.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

//auth routes
app.use("/auth",authroutes)

// Routes
app.use("/api/shoes", shoeRoutes);
app.use("/api/ratings", ratingRoutes);

//chat routes
app.use("/api/chat", chatRoute);

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
