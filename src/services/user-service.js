const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const ApiError = require("../utils/api-error");
const hashGenerator = require("../utils/hash-generator");
const User = require("../models/user-model");

exports.createStudent = asyncHandler(async (req, res, next) => {
  const user = req.body;

  const hashPassword = hashGenerator(user.password);
  const role = "student";
  const enrollDate = new Date();
  const sql =
    "insert into users(name, email,password, collage_id,enrollment_date, gpa,role, nat_id) values(?,?,?,?,?,?,?,?)";
  const values = [
    user.name,
    user.email,
    hashPassword,
    user.collageId,
    enrollDate,
    user.gpa,
    role,
    user.natId,
  ];

  db.query(sql, values, async (error, result) => {
    if (error) {
      return next(new ApiError(error.message, 500));
    }
    const data = await User.findOne(user, next);

    if (!data) return next(new ApiError("unexpected error", 500));

    return res.status(200).json({
      message: "Student has been created successfully",
      data: result,
    });
  });
});
