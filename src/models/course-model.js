const db = require("../config/db");
const ApiError = require("../utils/api-error");

const Course = function (course) {
  this.name = course.name;
  this.code = course.code;
  this.description = course.description;
};


Course.findCourse = async (course, next) =>
  new Promise((resolve) => {
    db.query(
      "SELECT name FROM courses WHERE name = ?",
      [course.name],
      (err, res) => {
        if (err) {
          return next(new ApiError(err.message, 500));
        }
        resolve(...res);
      }
    );
  });
module.exports = Course;
