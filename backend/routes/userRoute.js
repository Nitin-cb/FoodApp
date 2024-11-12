import express from 'express';
import { addAddress, loginUser,registerUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/addAddress",authMiddleware,addAddress)

export default userRouter;