const express = require("express");
const cors = require("cors");  
const app = express();
app.use(cors()); // 开启全局CORS

const port = 3010;
const path = require("path");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/public-data", (req, res) => {
  console.log("/public-data is called from: ", req.headers.referer);
  res.sendFile(path.resolve("pages/public-data.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
