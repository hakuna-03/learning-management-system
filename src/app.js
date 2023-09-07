const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const { allRequires } = require("./utils/index");
const { swaggerFile } = require("./utils/swagger");
const { globalError } = require("./middlewares/error-middleware");

const app = express();
dotenv.config({ path: `${__dirname}/../.env` });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
allRequires(app);

// Serve the Swagger UI.
app.get("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
