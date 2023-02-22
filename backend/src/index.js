const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cors()); // 开启全局CORS

const port = 3010;
const path = require("path");

const admin = {
  name: "Bob",
  age: 17,
};

app.get("/", (req, res) => {
  res.send("hello express.js");
});

app.get("/admin-data", (req, res) => {
  res.send(JSON.stringify(admin));
});

app.get("/public-data", (req, res) => {
  console.log("get /public-data is called from: ", req.headers.referer);
  res.sendFile(path.resolve("pages/public-data.html"));
});

app.post("/a-form-to", (req, res) => {
  console.log("post /a-form-to is called from: ", req.headers.referer);
  admin.name = req.body.name;
  admin.age = req.body.age;
  res.send(JSON.stringify(admin));
});

app.options('/a-form-to-wx', cors({
  // origin: 'http://example.com',
  allowedHeaders: ["x-is-bill"],
})); // enable pre-flight request
app.post(
  "/a-form-to-wx",
  cors({
    // origin: 'http://example.com',
    allowedHeaders: ["x-is-bill"],
  }),
  (req, res) => {
    console.log("post /a-form-to-wx is called from: ", req.headers.referer);
    console.log(req.body);
    admin.name = req.body.name;
    admin.age = req.body.age;
    res.send(JSON.stringify(admin));
  }
);

app.put("/a-form-to", (req, res) => {
  console.log("put /a-form-to is called from: ", req.headers.referer);
  admin.name = req.body.name;
  admin.age = req.body.age;
  res.send(JSON.stringify(admin));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
