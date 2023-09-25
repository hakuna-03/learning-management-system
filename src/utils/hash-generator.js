
const bcrypt = require("bcrypt");

const hashGenerator = (value) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(value, salt);
  return hash;
};


module.exports = hashGenerator;