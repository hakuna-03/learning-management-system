const db = require("../config/db");
const ApiError = require("../utils/api-error");

const Class = function (classObject) {
  this.courseId = classObject.courseId;
  this.name = classObject.name;
  this.code = classObject.code;
  this.description = classObject.description;
  this.year = classObject.year;
  this.semester = classObject.semester;
  this.status = classObject.status;
};

//////////////////// PROFESSOR ///////////////////////
Class.getProfessorClasses = async (id, next) =>
  new Promise((resolve) => {
    db.query(
      "SELECT c.class_id, c.name, c.code, c.description,c.semester,c.year FROM classes as c  INNER JOIN professor_classes as pf ON c.class_id = pf.class_id WHERE pf.professor_id=?",
      [id],
      (err, res) => {
        if (err) {
          return next(new ApiError(err.message, 500));
        }
        resolve(res);
      }
    );
  });

module.exports = Class;
