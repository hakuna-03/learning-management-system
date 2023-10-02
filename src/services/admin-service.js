/* eslint-disable no-lonely-if */
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const User = require("../models/user-model");
const { catchAsyncError } = require("../utils/catch-async-error");
const ApiError = require("../utils/api-error");
const hashGenerator = require("../utils/hash-generator");


exports.addProfessor = catchAsyncError(async (req, res) => {
  console.log("entered here");
  const prof = req.body;
  console.log(prof);
  // Check if the email already exists in the database
  db.query(
    `select email from users where email = '${prof.email}'`,
    async (err, result) => {
      if (err) {
        res.json({ message: "query error", err });
      } else {
        if (result.length > 0) {
          // Email already exists, return an error response
          res.status(400).json({
            status: "error",
            message: "Email already exists",
          });
        } else {
          // Hash the password before storing it
          const hashedPassword = await bcrypt.hash(
            prof.password,
            Number(process.env.SLAT_ROUND)
          );
          // Create a new User object with professor data
          const newProfessor = new User({
            name: prof.name,
            email: prof.email,
            password: hashedPassword,
            collageId: prof.collageId,
            gpa: prof.gpa,
            role: "professor", // Assuming professor role
            enrollmentDate: new Date(),
            natId: prof.natId,
          });
          console.log(newProfessor);

          // Build the SQL query manually
          const sql = `
            INSERT INTO users (name, email, password, collage_id, gpa, role, enrollment_date, nat_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

          // Define the values for the query
          const values = [
            newProfessor.name,
            newProfessor.email,
            newProfessor.password,
            newProfessor.collageId,
            newProfessor.gpa,
            newProfessor.role,
            newProfessor.enrollmentDate,
            newProfessor.natId,
          ];
          // query the query
          // eslint-disable-next-line no-unused-vars
          const queryResult = db.query(sql, values);
          // Send a success response
          res.status(201).json({
            status: "success",
            data: {
              professor: newProfessor,
            },
          });
        }
      }
    }
  );
});

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

    if (!data) return next(new ApiError("server error", 500));

    return res.status(200).json({
      message: "Student has been created successfully",
      data: result,
    });
  });
});
