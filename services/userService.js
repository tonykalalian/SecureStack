const md5 = require("md5");
const User = require("../models/User");
const registerUser = async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.username,
      password: md5(req.body.password),
    });
    await newUser.save();
    res.render("secrets");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const loginUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ email: username })
    .then((foundUser) => {
      if (foundUser && foundUser.password === md5(password)) {
        res.render("secrets");
      } else {
        res.send("Invalid username or password");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

module.exports = {
  registerUser,
  loginUser,
};
