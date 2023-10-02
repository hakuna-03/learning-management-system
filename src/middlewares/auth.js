const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/api-error");
const db = require("../config/db");

const verifyToken = (roles) => asyncHandler(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith(process.env.BEARER_TOKEN)) {
    token = authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("please login to get access this route", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const { role } = decoded;
    
  if (roles !== role) {
    return res.status(401).json({message:"This is not authrized user"});
  }

  req.user = decoded;
  next();
});

const doesTheUserExist = asyncHandler((req, res, next) => {
  const { email, natId, collageId } = req.body;
  const sql = `select email,nat_id, collage_id from users where email= ? or nat_id = ? or collage_id = ?`;
  db.query(sql, [email, natId, collageId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      return res.status(409).json({ message: "This user already exists!" });
    }
    next();
  });
});



module.exports = {
  doesTheUserExist,
  verifyToken,
};
