const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/api-error");

exports.verifyToken = asyncHandler(async (req, res, next) => {
  // 1) check if token exist
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith(process.env.BEARER_TOKEN)) {
    token = authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("please login to get access this route", 401));
  }
  // 2) then verify token (expired or change)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // 3) check if the user exists
  const { role } = decoded;
  if (role !== "admin") {
    return next(new ApiError("This is not authrized user", 401));
  }

  req.user = decoded;
  next();
});
