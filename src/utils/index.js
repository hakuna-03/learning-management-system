/*eslint-disable global-require*/
const swaggerUi = require("swagger-ui-express");
const docs = require("../docs");

exports.allRequires = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));
  app.use("/admins", require("../routes/admin-route"));
  app.use("/", require("../routes/auth-route"));
};
