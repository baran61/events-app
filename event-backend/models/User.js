const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  emailToken: String,
});

module.exports = mongoose.model("User", userSchema);
