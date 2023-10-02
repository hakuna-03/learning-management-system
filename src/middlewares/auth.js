const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/api-error");

exports.verifyToken = (roles) => asyncHandler(async (req, res, next) => {
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
