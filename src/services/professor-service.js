const Class = require("../models/class-model");
const { catchAsyncError } = require("../utils/catch-async-error");

exports.getProfessorClasses = catchAsyncError(async (req, res, next) => {
  const id = req.user.user_id;
  const classes = await Class.getProfessorClasses(id, next);
  res.status(200).json({ data: classes });
});
