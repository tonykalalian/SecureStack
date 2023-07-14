//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const encrypt = require("mongoose-encryption");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const secret = process.env.SECRET;

userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

const User = new mongoose.model("User", userSchema);
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.username,
      password: req.body.password,
    });
    await newUser.save();
    res.render("secrets");
  } catch (err) {
    console.log(err);
  }
});
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ email: username })
    .then((foundUser) => {
      if (foundUser && foundUser.password === password) {
        res.render("secrets");
      } else {
        res.send("Invalid username or password");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(process.env.PORT, (req, res) => {
  console.log("Server is listening on port 3000");
});
