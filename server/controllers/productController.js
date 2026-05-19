import { Product } from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";
import { asyncErrorHandler } from "../utils/asynchErrorHandller.js";
import { CustomError } from "../utils/CustomeError.js";

// ---------------------------------------------------------------------------------------------------------------

const addProduct = asyncErrorHandler(async (req, res, next) => {
  const { name, description, price, category, stock, discount } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    discount,
    image: {
      url: req.file.path, // cloudinary URL
      publicId: req.file.filename, // cloudinary public_id
    },
  });

  return res.status(201).json({
    success: true,
    message: "Product created successfully.",
    product,
  });
});

// ---------------------------------------------------------------------------------------------------------------

const productList = asyncErrorHandler(async (req, res, next) => {
  // pagination logic
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);
  const skip = (page - 1) * limit; // mongoose skip(10) will skip first 10 documents

  // ----------------------------------------------------------------------------------------------------------------

  const { category, search, sort } = req.query;

  let query = {};

  if (category) {
    query.category = category;
  }

  if (search) {
    // query.name = { $regex: search, $options: "i" };
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },

      {
        category: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  let sortOption = {
    createdAt: -1,
  };

  if (sort === "price_asc") {
    sortOption = { price: 1 };
  }

  if (sort === "price_desc") {
    sortOption = { price: -1 };
  }

  // console.log("query", query);

  const totalDocuments = await Product.countDocuments(query);
  const totalPages = Math.ceil(totalDocuments / limit);

  const allProducts = await Product.find(query)
    .select("name description price discount image category stock createdAt")
    .skip(skip)
    .limit(limit)
    .sort(sortOption);
  // .lean({ virtuals: true });

  return res.status(200).json({
    success: true,
    productList: allProducts,
    totalPages: totalPages,
    currentPage: page,
    totalDocuments: totalDocuments,
    length: allProducts?.length,
  });
});

// ---------------------------------------------------------------------------------------------------------------

const singleProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    const err = new CustomError("product not found", 404);
    return next(err);
  }
  return res.status(200).json({
    success: true,
    product: product,
  });
});

// ---------------------------------------------------------------------------------------------------------------

const removeProduct = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById({ _id: id });

  if (!product) {
    const err = new CustomError("product not found", 404);
    return next(err);
  }

  // delete image from cloudinary
  await cloudinary.uploader.destroy(product.image.publicId);

  await product.deleteOne();

  return res.status(200).json({
    success: true,
    message: `${product.name} removed successfully.`,
  });
});

// ---------------------------------------------------------------------------------------------------------------

const updateProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new CustomError("Product not found", 404));
  }

  // console.log('req.file', req.file)
  // if new image uploaded — delete old one from cloudinary and update
  if (req.file) {
    await cloudinary.uploader.destroy(product.image.publicId);
    product.image = {
      url: req.file.path,
      publicId: req.file.filename,
    };
  }

  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price || product.price;
  product.discount = req.body.discount || product.price;
  product.category = req.body.category || product.category;
  product.stock = product.stock + Number(req.body.stock) ?? product.stock; // ?? instead of || because stock can be 0

  const updatedProduct = await product.save();

  return res.status(200).json({
    success: true,
    message: `${product.name} updated successfully.`,
    product: updatedProduct,
  });
});

// ---------------------------------------------------------------------------------------------------------------

export { addProduct, productList, singleProduct, removeProduct, updateProduct };
