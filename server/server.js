import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import productRouter from "./routes/productRoutes.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";
import { CustomError } from "./utils/CustomeError.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import http from "http";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173", // user frontend
      "http://localhost:5174", // admin frontend
    ],
    credentials: true,
  }),
);
app.use(cookieParser());

const port = process.env.PORT || 8000;

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// if route not matches
app.use((req, res, next) => {
  const err = new CustomError(
    `can't find '${req.originalUrl}' on the server.`,
    404,
  );
  return next(err);
});

const server = http.createServer(app);



// global error handling middleware
app.use(globalErrorHandler);

const startServer = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
