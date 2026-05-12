import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "quantity must be at least 1"],
      default: 1,
    },
  },
  { _id: false },
);


// -----------------------------------------------------------

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required field"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email is required field"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required field"],
      trim: true,
      // select: false
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    cartData: {
      type: [cartItemSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);


/* 

  {
    cartData: [
        {
          productId: "64abc123...",
          quantity: 2
        },
        {
          productId: "64xyz789...",
          quantity: 1
        }
    ]
  }
*/


/*  After populate()

    {
      cartData: [
        {
          productId: {
            _id: "64abc123...",
            name: "iPhone",
            price: 999
          },
          quantity: 2
        }
      ]
    }

*/