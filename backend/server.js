import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import mongoose from "mongoose";

dotenv.config();

mongoose.set("strictQuery", true);
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/products", productRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 10000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.brightWhite
      .italic.bold
  )
);
