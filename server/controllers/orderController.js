import { Order } from "../models/orderModel.js";
import { User } from "../models/userModel.js";
import { Product } from "../models/productModel.js";
import { CustomError } from "../utils/CustomeError.js";

import { asyncErrorHandler } from "../utils/asynchErrorHandller.js";

// place order COD
const placeOrderCOD = asyncErrorHandler(async (req, res, next) => {

  const { address } = req.body;

  if (!address) {
    return next(new CustomError("Address is required", 400));
  }

  const { firstName, lastName, street, city, zipcode, state, phone } = address;

  if (
    !firstName ||
    !lastName ||
    !street ||
    !city ||
    !zipcode ||
    !state ||
    !phone
  ) {
    return next(new CustomError("All address fields are required", 400));
  }

  const user = await User.findById(req.userId).populate({
    path: "cartData.productId",
    select: "name price image stock",
  });

  if (!user) return next(new CustomError("User not found", 404));

  if (user.cartData.length === 0) {
    return next(new CustomError("Cart is empty", 400));
  }

  const items = [];

  for (const cartItem of user.cartData) {
    const product = cartItem.productId;

    if (product.stock < cartItem.quantity) {
      return next(new CustomError(`${product.name} is out of stock`, 400));
    }

    items.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: cartItem.quantity,
    });
  }

  const amount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const order = await Order.create({
    userId: req.userId,
    address,
    items,
    amount,
    paymentMethod: "COD",
    payment: false, // paid on delivery
  });

  // deduct stock
  for (const item of items) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stock: -item.quantity },
    });
  }

  // clear cart
  user.cartData = [];

  await user.save();

  return res.status(201).json({
    success: true,
    message: "Order placed with Cash on Delivery",
    order,
  });
});

// ---------------------------------------------------------------------------------------------------

// user orders
const myOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find({ userId: req.userId })
    .sort({ createdAt: -1 })
    .lean();

  return res.status(200).json({
    success: true,
    length: orders.length,
    orders,
  });
});

// ---------------------------------------------------------------------------------------------------

// get all orders — admin
const allOrders = asyncErrorHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const { status } = req.query;
  let query = {};
  if (status) query.status = status;

  const totalDocuments = await Order.countDocuments(query);
  const totalPages = Math.ceil(totalDocuments / limit);

  const orders = await Order.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

    console.log("orders", orders);

  return res.status(200).json({
    success: true,
    currentPage: page,
    totalPages,
    totalDocuments,
    length: orders.length,
    orders,
  });
});

// ---------------------------------------------------------------------------------------------------

// update order status — admin
const updateOrderStatus = asyncErrorHandler(async (req, res, next) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) return next(new CustomError("Order not found", 404));

 /*  if (order.status === "Delivered") {
    return next(new CustomError(`Order already ${order.status}`, 400));
  } */

  // mark payment true when delivered COD
  if (status === "Delivered" && order.paymentMethod === "COD") {
    order.payment = true;
  }

  if (status === "Delivered") {
    order.deliveredAt = new Date();
  }

  order.status = status;
  await order.save();

  return res.status(200).json({
    success: true,
    message: `Order id : ${order._id} is '${status}'`,
    order,
  });
});

export { placeOrderCOD, allOrders, myOrders, updateOrderStatus };
