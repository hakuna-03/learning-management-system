const ApiError = require("../utils/api-error");

const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

const handleJWTInvalidSignature = () =>
  new ApiError("please login again", 401);
const handleJWTExpirad = () =>
  new ApiError("please login again", 401);

exports.globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
    if (err.name === "JsonWebTokenError") err = handleJWTInvalidSignature();
    if (err.name === "TokenExpiredError") err = handleJWTExpirad();
    
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
  
    sendErrorForProd(err, res);
  }
};
