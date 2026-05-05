
import { CustomError } from "./CustomeError.js";
import cloudinary from "../config/cloudinary.js";

// ---------------------------------------------------------------------------------------------------------------------------

//  development error
const devErrors = (res, error) => {
  return res.status(error.statusCode).json({
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

// -different kinds of prod errors--------------------------------------------------------------------------------------------

const duplicateKeyErrorHandler = (error) => {
  // console.log("dupError", error)
  return new CustomError(
    `This '${error.keyValue.name}' value is already taken`,
    400,
  );
};

// ---------------------------------------------------------------------------------------------------------------------------

const mongooseValidationErrorHandler = (error) => {
  const errors = Object.values(error.errors).map((val) => val.message);
  const errorMessages = errors.join(", ");
  return new CustomError(errorMessages, 400);
};
// ---------------------------------------------------------------------------------------------------------------------------

const jwtErrorHandler = (error) => {
  if (error.name === "TokenExpiredError") {
    return new CustomError("Session expired, please login again", 401);
  }
  return new CustomError("Invalid token, please login again", 401);
};

// ---------------------------------------------------------------------------------------------------------------------------

const prodErrors = (res, error) => {
  // console.log('prodError', error);

  /* on CustomError class, added isOperational = true. so error send through
    new CustomError() will have isOperational property and only those error message will sent in production */
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      status: "failed",
      message: error.message,
    });
  }
  // some errors are send by mongoose. where isOperational = false, so, here we send generic error message in production.
  // we also handle some mongoose validation errors as well jsonwebtoken error
  else {
    return res.status(error.statusCode).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};
// -------------------------------------------------------------------------------------------------------------------------------

export const globalErrorHandler = (err, req, res, next) => {

  // if upload succeeded but error occurred after — clean up cloudinary image
  if (req.file) {
    cloudinary.uploader.destroy(req.file.filename);
  }

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";
  err.status = err.status || "failed";

  // console.log('node env', process.env.NODE_ENV);

  if (process.env.NODE_ENV === "development") {
    devErrors(res, err);
  } else if (process.env.NODE_ENV === "production") {
    if (err.code == 11000) {
      err = duplicateKeyErrorHandler(err);
      // the returned result of duplicateKeyErrorHandler() is stored in err variable and sent to prodErrors() function
    }

    if (err.name == "ValidationError") {
      err = mongooseValidationErrorHandler(err);
    }

    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      err = jwtErrorHandler(err);
    }

    prodErrors(res, err);
  }
};
