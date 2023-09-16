const db = require("../config/db.js")
const User = require("../models/user-model.js");
const { catchAsyncError } = require("../utils/catch-async-error.js");
const bcrypt = require('bcrypt');

exports.addProfessor = catchAsyncError(async (req, res) => {
    const prof = req.body;
    // Check if the email already exists in the database
    db.query(`select email from users where email = '${prof.email}'`, async (err, result) => {
        if (err) {
            res.json({ message: "query error", err })
        } else {
            if (result.length > 0) {
                // Email already exists, return an error response
                res.status(400).json({
                    status: "error",
                    message: "Email already exists",
                });
            }
            else {
                // Hash the password before storing it
                const hashedPassword = await bcrypt.hash(prof.password, parseInt(process.env.SLAT_ROUND))
                // Create a new User object with professor data
                const newProfessor = new User({
                    name: prof.name,
                    email: prof.email,
                    password: hashedPassword,
                    collageId: prof.collageId,
                    gpa: prof.gpa,
                    role: 'professor', // Assuming professor role
                    inrollemntDate: new Date(),
                    natId: prof.natId,
                });

                // Build the SQL query manually
                const sql = `
            INSERT INTO users (name, email, password, collageId, gpa, role, inrollemntDate, natId)
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
                    newProfessor.inrollemntDate,
                    newProfessor.natId,
                ];
                // query the query
                const result = db.query(sql, values);
                // Send a success response
                res.status(201).json({
                    status: "success",
                    data: {
                        professor: newProfessor,
                    },
                });
            }
        }
    })
})
