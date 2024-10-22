const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  role: {
    type: String,
    enum: ["USER", "ADMIN", "SUPERADMIN"],
    default: "USER",
  },
  profile: { type: String },
  number: { type: Number },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
