const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/../.env` });
// Create connection to MySQL database
const db = mysql.createConnection({
  host: process.env.BD_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("Couldn't Connect to db");
  } else {
    console.log("Connected to db successfolly");
  }
});

module.exports = db;
