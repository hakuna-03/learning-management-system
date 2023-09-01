const express = require("express");
const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("<h1>Hakuna Matata!</h1>");
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
