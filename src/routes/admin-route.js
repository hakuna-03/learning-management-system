const { addProfessor } = require("../services/admin-service.js");
const { addProfessorValidator } = require("../utils/validators/admin-validator.js");

const router = require("express").Router();

router.post("/professor",addProfessorValidator,addProfessor);

module.exports = router;