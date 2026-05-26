import express from "express";
import {
  addTocart,
  clearCart,
  decreaseCartQuantity,
  increaseCartQuantity,
  getCartDetails,
  removeFromCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.post("/:productId", authMiddleware, addTocart);


cartRouter.patch("/:productId/decrease", authMiddleware, decreaseCartQuantity);

cartRouter.patch("/:productId/increase", authMiddleware, increaseCartQuantity);

cartRouter.delete("/clear", authMiddleware, clearCart);

cartRouter.delete("/:productId", authMiddleware, removeFromCart);

cartRouter.get("/", authMiddleware, getCartDetails);

export default cartRouter;
