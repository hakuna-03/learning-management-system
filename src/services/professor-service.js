const User = require("../models/user-model");
const { catchAsyncError } = require("../utils/catch-async-error");

exports.getProfessorClasses = catchAsyncError(async (req, res, next) => {
  const id = req.user.user_id;
  const classes = await User.getProfessorClasses(id, next);
  res.status(200).json({ data: classes });
});
