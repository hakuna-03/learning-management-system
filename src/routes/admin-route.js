const router = require("express").Router();
const {
  addProfessorValidator,
} = require("../utils/validators/admin-validator");

const { studentValidator } = require("../utils/validators/student-validator");
const { createStudent, addProfessor } = require("../services/admin-service");
const { verifyToken } = require("../middlewares/auth");


router.post("/student",verifyToken('admin'),studentValidator, createStudent);
router.post("/professor", addProfessorValidator, addProfessor);

module.exports = router;
