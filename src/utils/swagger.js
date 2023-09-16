const yaml = require("yamljs");

// Load the swagger specification file.
exports.swaggerFile = yaml.load(`${__dirname}/swagger.yaml`);
