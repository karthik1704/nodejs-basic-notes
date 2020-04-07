const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.send("HI From Prople / ");
});

route.get("/test", (req, res) => {
  res.send("HI From Prople /test ");
});

module.exports = route;
