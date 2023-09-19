const router = require("express").Router();
const { studentValidator } = require("../utils/validators/student-validator");
const { createStudent } = require("../services/user-service");
const { verifyToken } = require("../middlewares/auth");

router.post("/student", verifyToken, studentValidator, createStudent);

module.exports = router;
