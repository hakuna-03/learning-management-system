const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/api-error");
const { findByEmail } = require("../models/user-model");

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
  
  const currentUser = await findByEmail(decoded.email);
  if (!currentUser) {
    return next(
      new ApiError("The user that belong to this token doesn't exist", 401)
    );
  }

  req.user = currentUser;
  next();
});
