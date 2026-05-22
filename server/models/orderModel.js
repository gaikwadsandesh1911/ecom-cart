import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    address: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      zipcode: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        discount: {
          type: Number,
          default: 0,
        },
        finalPrice: {
          type: Number,
          required: true,
        },
        quantity: { type: Number, required: true },
        image: {
          type: Object,
        },
      },
    ],

    amount: { type: Number, required: true },

    status: {
      type: String,
      default: "Preparing",
      enum: {
        values: ["Preparing", "Out for Delivery", "Delivered", "Cancelled"],
        message: "{VALUE} is not a valid status",
      },
    },

    payment: {
      type: Boolean,
      default: false,
    },

    paymentMethod: {
      type: String,
      enum: {
        values: ["COD", "Razorpay"],
        message: "{VALUE} is not a valid payment method",
      },
      default: "COD",
    },

    deliveredAt:Date,

    paymentId: {
      type: String,
      default: null, // razorPay paymentIntent id
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
