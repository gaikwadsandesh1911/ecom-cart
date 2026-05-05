import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';

import { placeOrderCOD, allOrders, myOrders, updateOrderStatus } from '../controllers/orderController.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

const orderRouter = express.Router();

orderRouter.post("/place-order", authMiddleware, placeOrderCOD);

orderRouter.get('/my-orders', authMiddleware, myOrders);

orderRouter.get('/all-orders', authMiddleware, adminMiddleware, allOrders);

orderRouter.patch('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

export default orderRouter;