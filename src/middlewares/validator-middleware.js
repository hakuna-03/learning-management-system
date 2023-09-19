const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../config/db");

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

const doesTheUserExist = asyncHandler((req, res, next) => {
  const { email, natId, collageId } = req.body;
  const sql = `select email,nat_id, collage_id from users where email= ? or nat_id = ? or collage_id = ?`;
  db.query(sql, [email, natId, collageId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      return res.status(409).json("This user already exists!");
    }
    next();
  });
});

module.exports = {
  validatorMiddleware,
  doesTheUserExist,
};
