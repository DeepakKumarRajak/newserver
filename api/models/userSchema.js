const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  mobile: { type: String, required: true },
  post: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
