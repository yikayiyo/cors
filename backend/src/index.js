const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// app.use(cors()); // 开启全局CORS

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

const postCorsOpt = {
  "origin": 'http://localhost:5173',
  "methods": "POST",
  "allowedHeaders": ["x-is-bill"],
  "optionsSuccessStatus": 204
}
app.options("/a-form-to-wx", cors({...postCorsOpt})); // enable pre-flight request
app.post(
  "/a-form-to-wx",
  cors({
    ...postCorsOpt
  }),
  (req, res) => {
    console.log("post /a-form-to-wx is called from: ", req.headers.referer);
    admin.name = req.body.name;
    admin.age = req.body.age;
    res.json(admin);
  }
);

const putCorsOpt = {
  "origin": 'http://localhost:5173',
  "methods": "PUT",
  "optionsSuccessStatus": 204
}
app.options("/a-form-to-put", cors({...putCorsOpt})); // enable pre-flight request
app.put("/a-form-to-put", cors({
  ...putCorsOpt
}), (req, res) => {
  console.log("put /a-form-to-put is called from: ", req.headers.referer);
  admin.name = req.body.name;
  admin.age = req.body.age;
  res.json(admin);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
