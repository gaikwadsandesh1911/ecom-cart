import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },

    image: {
      url: {
        type: String,
        required: [true, "image url is required"],
      },
      publicId: {
        type: String,
        required: [true, "image publicId is required"],
      },
    },
    category: {
      type: String,
      required: [true, "category is required"],
      lowercase: true
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

productSchema.index({ category: 1, name: 1 });
productSchema.index({ createdAt: -1 });

export const Product = mongoose.model("Product", productSchema);
