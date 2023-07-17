const express = require("express");
const router = express.Router();
const md5 = require("md5");
const User = require("../models/User");
const userService = require("../services/userService");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", userService.registerUser);

router.post("/login", userService.loginUser);

module.exports = router;
