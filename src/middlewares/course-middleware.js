const asyncHandler = require("express-async-handler");
const db = require("../config/db");

const doesTheCourseExist = asyncHandler((req, res, next) => {
  const { name } = req.body;
  const sql = `select name from courses where name = ?`;
  db.query(sql, [name], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      return res.status(409).json({ message: "This Course already exists!" });
    }
    next();
  });
});

module.exports = {
  doesTheCourseExist,
};
