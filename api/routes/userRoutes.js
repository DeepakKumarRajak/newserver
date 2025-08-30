const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

// ✅ Create user
router.post("/register", async (req, res) => {
  const { username, password, email, age, mobile, post, address } = req.body;

  if (!username || !password || !email || !age || !mobile || !post || !address) {
    return res.status(400).json({ error: "Please fill all required fields" });
  }

  try {
    const preuser = await User.findOne({ email });
    if (preuser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ username, password, email, age, mobile, post, address });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ✅ Get all users
router.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update user
router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
