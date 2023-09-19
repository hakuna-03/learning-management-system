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
      "SELECT name,email,password,role FROM users WHERE email=?",
      [user.email],
      (err, res) => {
        if (err) {
          return next(new ApiError(err.message, 500));
        }
        resolve(...res);
      }
    );
  });

User.findByEmail = (email) => {
  const sql = `select email from users where email= ?`;
  const value = [email];
  db.query(sql, value, (err, data) => {
    if (err) return new ApiError(err.message, 500);
    if (data.length) {
      return true;
    }
  });
  return false;
};

module.exports = User;
