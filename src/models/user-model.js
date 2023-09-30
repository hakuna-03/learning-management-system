const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const ApiError = require("../utils/api-error");

const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  this.collageId = user.collageId;
  this.gpa = user.gpa;
  this.role = user.role;
  this.enrollmentDate = user.enrollmentDate;
  this.natId = user.natId;
};

User.login = async (user, next) =>
  new Promise((resolve) => {
    db.query(
      "SELECT user_id, name,email,password,role FROM users WHERE email=?",
      [user.email],
      (err, res) => {
        if (err) {
          return next(new ApiError(err.message, 500));
        }
        resolve(...res);
      }
    );
  });

User.findById = async (id, next) =>
  new Promise((resolve) => {
    db.query(
      "SELECT user_id,role FROM users WHERE user_id=?",
      [id],
      (err, res) => {
        if (err) {
          return next(new ApiError(err.message, 500));
        }
        resolve(...res);
      }
    );
  });

User.findOne = async (user, next) =>
  new Promise((resolve) => {
    db.query(
      "SELECT user_id, email,role FROM users WHERE email=?",
      [user.email],
      (err, res) => {
        if (err) {
          return next(new ApiError(err.message, 500));
        }
        resolve(...res);
      }
    );
  });

//////////////////// PROFESSOR ///////////////////////
User.getProfessorClasses = async (id, next) =>
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

module.exports = User;
