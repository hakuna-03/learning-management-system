const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { allRequires } = require("./utils/index");
const { globalError } = require("./middlewares/error-middleware");
const ApiError = require("./utils/api-error");

const app = express();
dotenv.config({ path: `${__dirname}/../.env` });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
allRequires(app);

app.all("/*", (req, res, next) => {
  next(
    new ApiError(`can't find this route: ${req.originalUrl} on server`, 404)
  );
});

app.use(globalError);

module.exports = app;
