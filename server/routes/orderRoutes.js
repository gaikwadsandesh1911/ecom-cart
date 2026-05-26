import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';

import { placeOrder, allOrders, myOrders, updateOrderStatus } from '../controllers/orderController.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

const orderRouter = express.Router();

orderRouter.post("/place-order", authMiddleware, placeOrder);

orderRouter.get('/my-orders', authMiddleware, myOrders);

// for admin

orderRouter.get('/all-orders', authMiddleware, adminMiddleware, allOrders);

orderRouter.patch('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

export default orderRouter;