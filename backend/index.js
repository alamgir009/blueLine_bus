import express from "express";
import cors from "cors";
import env from "dotenv";
import connectDB from "./config/db.js";

env.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
connectDB();

// Routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
