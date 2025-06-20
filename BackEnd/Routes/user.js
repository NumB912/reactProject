// routes/yourRoute.js
const express = require("express");
const route = express.Router();
const db = require("../config/config"); // nếu bạn đã cấu hình PostgreSQL ở đây

route.get("/", (req, res) => {
  res.send("HELLO");
});

module.exports = route;
