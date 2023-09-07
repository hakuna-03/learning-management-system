/*eslint-disable global-require*/
exports.allRequires = (app) => {
  app.use("/", require("../routes/auth-route"));
};
