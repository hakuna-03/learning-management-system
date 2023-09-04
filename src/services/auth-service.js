const bcrypt = require("bcrypt");
const { catchAsyncError } = require("../utils/catch-async-error");
const ApiError = require("../utils/api-error");
const createToken = require("../utils/create-token");

exports.login = catchAsyncError(async (req, res, next) => {
  //find user by email
  const user = {};

  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return next(new ApiError("Incorrect email or password", 401));

  const token = createToken({ id: user.id, role: user.role });

  res.status(201).json({ token, name: user.name });
});
