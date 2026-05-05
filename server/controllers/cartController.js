import { User } from "../models/userModel.js";
import { asyncErrorHandler } from "../utils/asynchErrorHandller.js";
import { Product } from "../models/productModel.js";
import { CustomError } from "../utils/CustomeError.js";

//add items to  cart
const addTocart = asyncErrorHandler(async (req, res, next) => {
  
  const { productId } = req.params;

  if (!productId) {
    return next(new CustomError("productId is required", 400));
  }

  //   if product exists and has got stock
  const product = await Product.findById(productId);
  if (!product) return next(new CustomError("Product not found", 404));
  if (product.stock < 1)
    return next(new CustomError("Product is out of stock", 400));

  //   check if user login
  const user = await User.findById(req.userId);
  if (!user) return next(new CustomError("User not found, Please Login", 404));

  const itemIndex = user.cartData.findIndex(
    (item) => item.productId.toString() === productId,
  );

  // product already in cart — increment quantity
  if (itemIndex > -1) {
    // first check stock limit
    if (user.cartData[itemIndex].quantity >= product.stock) {
      return next(
        new CustomError(`Only ${product.stock} items available`, 400),
      );
    }
    user.cartData[itemIndex].quantity += 1;
  } else {
    // product not in cart — add it
    user.cartData.push({ productId, quantity: 1 });
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Product added to cart",
    cart: user.cartData,
  });
});

// ---------------------------------------------------------------------------------------------

// remove from cart — decrement quantity by 1, remove if quantity hits 0
const removeFromCart = asyncErrorHandler(async (req, res, next) => {

  const { productId } = req.params;

  if (!productId) {
    return next(new CustomError("productId is required", 400));
  }

  const user = await User.findById(req.userId);
  if (!user) return next(new CustomError("User not found", 404));

  const itemIndex = user.cartData.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (itemIndex === -1) {
    return next(new CustomError("Product not in cart", 404));
  }

  if (user.cartData[itemIndex].quantity > 1) {
    user.cartData[itemIndex].quantity -= 1;
  } else {
    // quantity is 1 — remove entirely
    user.cartData.splice(itemIndex, 1);
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Product removed from cart",
    cart: user.cartData,
  });
});

// ---------------------------------------------------------------------------------------------

const getCartDetails = asyncErrorHandler(async (req, res, next) => {
  
  const user = await User.findById(req.userId).populate({
    path: "cartData.productId",
    select: "name price image category stock",
  }).lean();

  if (!user) return next(new CustomError("User not found", 404));

  // shape cart for frontend
  const cart = user.cartData.map((item) => ({
    productId: item.productId._id,
    name: item.productId.name,
    price: item.productId.price,
    image: item.productId.image,
    category: item.productId.category,
    stock: item.productId.stock,
    quantity: item.quantity,
    totalPrice: item.productId.price * item.quantity,
  }));

  const cartTotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return res.status(200).json({
    success: true,
    cartCount,
    cartTotal,
    cart,
  });
});

// ---------------------------------------------------------------------------------------------

// clear cart — empty entire cart
const clearCart = asyncErrorHandler(async (req, res, next) => {

  const user = await User.findById(req.userId);

  if (!user) return next(new CustomError("User not found", 404));

  user.cartData = [];
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Cart cleared",
    cart: [],
  });
});

// ---------------------------------------------------------------------------------------------

// delete from cart — remove product entirely regardless of quantity
const deleteFromCart = asyncErrorHandler(async (req, res, next) => {

  const { productId } = req.params;

  if (!productId) {
    return next(new CustomError("productId is required", 400));
  }

  const user = await User.findById(req.userId);
  if (!user) return next(new CustomError("User not found", 404));

  const itemExists = user.cartData.some(
    (item) => item.productId.toString() === productId,
  );

  if (!itemExists) {
    return next(new CustomError("Product not in cart", 404));
  }

  user.cartData = user.cartData.filter(
    (item) => item.productId.toString() !== productId,
  );

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Product deleted from cart",
    cart: user.cartData,
  });
});

export { addTocart, removeFromCart, getCartDetails, clearCart, deleteFromCart };
