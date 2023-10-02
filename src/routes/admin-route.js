const router = require("express").Router();
const {
  addProfessorValidator,
} = require("../utils/validators/admin-validator");

const { studentValidator } = require("../utils/validators/student-validator");
const {
  createStudent,
  addProfessor,
  createCourse,
} = require("../services/admin-service");
const { verifyToken } = require("../middlewares/auth");
const { createCourseValidator } = require("../utils/validators/create-course-validator");


router.post("/student",verifyToken('admin'),studentValidator, createStudent);
router.post("/courses", verifyToken("admin"), createCourseValidator ,createCourse);
router.post("/professor", addProfessorValidator, addProfessor);

module.exports = router;
