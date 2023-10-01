const router = require("express").Router();
const { addProfessor } = require("../services/admin-service");
const {
  addProfessorValidator,
} = require("../utils/validators/admin-validator");

const { studentValidator } = require("../utils/validators/student-validator");
const { createStudent } = require("../services/user-service");
const { verifyToken } = require("../middlewares/auth");
const { allowedTo, auth } = require("../services/auth-service");

router.post("/student", auth,allowedTo('admin'), studentValidator, createStudent);
router.post("/professor",addProfessorValidator, addProfessor);

module.exports = router;
