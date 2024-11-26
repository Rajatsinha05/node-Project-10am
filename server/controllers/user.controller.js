const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const sendMail = require("../service/sendMail");
const otps = new Map();
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
        username: user.username,
        isActive: user.isActive,
      };
      let token = await jwt.sign(data, "private-key");
      let otp = Math.round(Math.random() * 10000);
      console.log(otp);

      otps.set(email, otp);
      console.log(otps);

      let html = `<div > 
         <h1>hello ${user.username}</h1>
         <a href=http://localhost:8090/user/verify/${token}/${otp}> verify</a>
      </div>`;
      console.log(
        `<a href=http://localhost:8090/user/verify/${token}/${otp}> verify</a>`
      );

      try {
        await sendMail(email, "verify", html);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(201).json({
        msg: "user created",
        token: token,
        isVerified: user.isVerified,
      });
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
    username: user.username,
    isActive: user.isActive,
  };
  let token = await jwt.sign(data, "private-key");
  return res.status(200).json({
    msg: "user loggedIn",
    token: token,
    isVerified: user.isVerified,
    isActive: user.isActive,
  });
};

const GetUser = async (req, res) => {
  let users = await User.find();
  res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  let { id } = req.params;
  try {
    let user = await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted", user });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ msg: "error deleting user", error });
  }
};

const verifyUser = async (req, res) => {
  let { token, otp } = req.params;
  let decode = await jwt.verify(token, "private-key");
  if (!decode) {
    return res.status(403).json({ msg: "err" });
  }
  let oldOtp = otps.get(decode.email);

  if (oldOtp == otp) {
    let data = await User.findByIdAndUpdate(
      decode.id,
      { isVerified: true },
      { new: true }
    );
    res.status(200).json({ msg: "verified", data });
  } else {
    res.status(404).json({ err: "invalid otp" });
  }
};

const getAdmins = async (req, res) => {
  try {
    let data = await User.find({ role: "ADMIN" });
    res.status(202).json(data);
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
};

// verify admin by superadmin

const verifyAdmin = async (req, res) => {
  let { adminId } = req.params;
  try {
    let user = await User.findByIdAndUpdate(
      adminId,
      { isVerified: true },
      { new: true }
    );
    res.status(200).json({ msg: "verified" }, { user });
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
};
module.exports = { Signup, Login, GetUser, verifyUser, deleteUser, getAdmins };
