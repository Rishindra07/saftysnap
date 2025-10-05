// backend/routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!email) return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "email", message: "Email is required" } });

  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: { code: "USER_EXISTS", message: err.message } });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.status(400).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
