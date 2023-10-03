const basicInfo = require("./basicInfo");
const servers = require("./servers");
const components = require("./components")
const tags = require("./tags");
const auth = require("./auth");
const admin = require("./admin");
const professor = require("./professor");

module.exports = {
  ...basicInfo,
  ...servers,
  ...components,
  ...tags,
  paths:{
    ...auth,
    ...admin,
    ...professor,
  }
};
