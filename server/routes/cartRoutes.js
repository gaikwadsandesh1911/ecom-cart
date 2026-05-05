import express from 'express';
import { addTocart, clearCart, deleteFromCart, getCartDetails, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.post('/:productId', authMiddleware,  addTocart)

// it decrease quanity of productId
cartRouter.patch('/:productId/decrease', authMiddleware, removeFromCart)
cartRouter.delete('/clear', authMiddleware, clearCart)

// it delete  productId from  cart
cartRouter.delete('/:productId', authMiddleware, deleteFromCart)


cartRouter.get('/', authMiddleware, getCartDetails)

export default cartRouter;