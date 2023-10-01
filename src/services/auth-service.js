const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { catchAsyncError } = require("../utils/catch-async-error");
const User = require("../models/user-model");
const ApiError = require("../utils/api-error");
const createToken = require("../utils/create-token");

exports.login = catchAsyncError(async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  const data = await User.login(user, next);
  if (!data) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  if (!(await bcrypt.compare(req.body.password, data.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  const token = createToken({ id: data.user_id, role: data.role });
  res.status(200).json({ token, name: data.name, role: data.role });
});

exports.auth = catchAsyncError(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("Invalid or missing token", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const currentUser = await User.findById(decoded.id, next);
  
  if (!currentUser) return next(new ApiError("this user no longer exist", 401));

  req.user = currentUser;
  next();
});

exports.allowedTo = (...roles) =>
  catchAsyncError(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new ApiError("You're not allowed to access this route", 403));
    next();
  });
