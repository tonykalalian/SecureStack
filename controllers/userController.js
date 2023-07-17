const bcrypt = require("bcrypt");
const userService = require("../services/userService");

async function register(req, res) {
  const { username, password } = req.body;
  try {
    await userService.registerUser(username, password);
    res.render("secrets");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const foundUser = await userService.findUserByEmail(username);
    if (foundUser) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        foundUser.password
      );
      if (isPasswordMatch) {
        res.render("secrets");
      } else {
        res.send("Invalid username or password");
      }
    } else {
      res.send("Invalid username or password");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  register,
  login,
};
