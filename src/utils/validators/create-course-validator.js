const { check } = require("express-validator");
const {
  validatorMiddleware,
} = require("../../middlewares/validator-middleware");
const { doesTheCourseExist } = require("../../middlewares/course-middleware");

exports.createCourseValidator = [
  check("name").notEmpty().withMessage("Course name is required"),
  check("code").notEmpty().withMessage("Course code is required"),
  check("description")
    .notEmpty()
    .withMessage("Description is required"),
  validatorMiddleware,
  doesTheCourseExist
];
