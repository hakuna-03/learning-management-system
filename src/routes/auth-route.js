const router = require("express").Router();
const { login } = require("../services/auth-service");
const { loginValidator } = require("../utils/validators/auth-validator");

router.post("/login", loginValidator, login);

module.exports = router;
