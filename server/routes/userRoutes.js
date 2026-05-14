import express from 'express';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/me', authMiddleware, getCurrentUser);

export default userRouter;