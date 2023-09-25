const bcrypt = require("bcrypt");
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

  if (!await bcrypt.compare(req.body.password, data.password)) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  const token = createToken({ id: data.user_id, role: data.role});
  res.status(200).json({ token, name: data.name, role: data.role });
});


