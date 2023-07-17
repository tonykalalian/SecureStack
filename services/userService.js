const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");

async function registerUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    email: username,
    password: hashedPassword,
  });
  await newUser.save();
}

async function findUserByEmail(username) {
  return User.findOne({ email: username });
}

module.exports = {
  registerUser,
  findUserByEmail,
};
