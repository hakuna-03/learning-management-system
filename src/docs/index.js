const basicInfo = require("./basicInfo");
const servers = require("./servers");
const tags = require("./tags");
const auth = require("./auth");

module.exports = {
  ...basicInfo,
  ...servers,
  ...tags,
  ...auth,
};
