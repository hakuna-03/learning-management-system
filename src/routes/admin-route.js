const router = require("express").Router();
const { addProfessor } = require("../services/admin-service");
const { addProfessorValidator } = require("../utils/validators/admin-validator");


router.post("/professor",addProfessorValidator,addProfessor);

module.exports = router;