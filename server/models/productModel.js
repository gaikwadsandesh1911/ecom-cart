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
    discount: {
      type: Number,
      default: 0,
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
      lowercase: true,
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

productSchema.virtual("finalPrice").get(function () {
  return Math.round(this.price - (this.price * this.discount) / 100) ;
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export const Product = mongoose.model("Product", productSchema);
