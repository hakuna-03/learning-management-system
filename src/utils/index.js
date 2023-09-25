/*eslint-disable global-require*/
const swaggerUi = require("swagger-ui-express");
const docs = require("../docs");

exports.allRequires = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));
  app.use("/", require("../routes/auth-route"));
  app.use("/admin", require("../routes/admin-route"));
};
