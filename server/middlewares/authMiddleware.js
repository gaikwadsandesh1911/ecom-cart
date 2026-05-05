import jwt from "jsonwebtoken";
import { CustomError } from "../utils/CustomeError.js";
import { asyncErrorHandler } from "../utils/asynchErrorHandller.js";
import dotenv from 'dotenv'
dotenv.config();

const authMiddleware = asyncErrorHandler(async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return next(new CustomError("Unauthorized, Please LogIn!", 401));
  }

  token = token.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // on req object created userId and userRole properties
  req.userId = decoded.userId;
  req.userRole = decoded.userRole;
  next();
});

export default authMiddleware;
