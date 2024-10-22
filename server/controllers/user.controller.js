const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const Signup = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(403).json({ msg: "user already registered" });
    } else {
      let hash = await bcrypt.hash(password, 10);
      req.body.password = hash;
      user = await User.create(req.body);
      let data = {
        email: user.email,
        id: user.id,
        role: user.role,
      };
      let token = await jwt.sign(data, "private-key");
      return res.status(201).json({ msg: "user created", token: token });
    }
  } catch (error) {
    res.status(500).json({ msg: "err", error: error.message });
  }
};

const Login = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({ msg: "invalid password " });
  }
  let data = {
    email: user.email,
    id: user.id,
    role: user.role,
  };
  let token = await jwt.sign(data, "private-key");
  return res.status(200).json({ msg: "user loggedIn", token: token });
};

const GetUser = async (req, res) => {
  let users = await User.find();
  res.status(200).json(users);
};

module.exports = { Signup, Login, GetUser};
