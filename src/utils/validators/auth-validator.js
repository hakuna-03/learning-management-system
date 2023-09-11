const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator-middleware");

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("Invalid email address"),
  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 4 })
    .withMessage("Too short password must be at least 4 characters"),

  validatorMiddleware
];
