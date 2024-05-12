import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.use(express.json());
// testing a routing
app.use("/api/user", userRoutes); //localhost:3000/api/user/test

app.use("/api/auth", authRoutes);
