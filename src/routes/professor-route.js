const router = require("express").Router();
const { allowedTo, auth } = require("../services/auth-service");
const { getProfessorClasses } = require("../services/professor-service");

router.get("/classes", auth, allowedTo("professor"), getProfessorClasses);

module.exports = router;
