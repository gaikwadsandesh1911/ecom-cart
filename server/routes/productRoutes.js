import express from "express";
import { upload } from "../middlewares/fileUploadMiddleware.js";
import { addProduct, productList, singleProduct, removeProduct, updateProduct } from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const productRouter = express.Router();

productRouter.get("/product-list", productList);
productRouter.get('/single-product/:id', singleProduct)

productRouter.post('/add-product', authMiddleware, adminMiddleware, upload.single("image"), addProduct);
productRouter.put('/update-product/:id', authMiddleware, adminMiddleware, upload.single('image'), updateProduct);
productRouter.delete('/remove-product/:id', authMiddleware, adminMiddleware, removeProduct);

export default productRouter;