const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const { swaggerFile } = require("./utils/swagger");
const { globalError } = require("./middlewares/error-middleware");

const app = express();
dotenv.config({ path: `${__dirname}/../.env` });

app.use(express.json());

// Serve the Swagger UI.
app.get("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// testing purpose
app.get("/", (req, res) => {
  res.send("<h1>Hakuna Matata!</h1>");
});

const server = app.listen(process.env.PORT, () => {
  console.log("server is running");
});

//global error handling middleware
app.use(globalError);

// handle errors out of Express
process.on("unhandledRejection", (err) => {
  server.close(() => {
    console.log(`UnhandleRejection Errors: ${err}, Shutting down....`);
    process.exit(1);
  });
});
