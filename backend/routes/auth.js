// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.js"); // import your User model
const jwt = require("jsonwebtoken")


// ---------------- SIGNUP ----------------
router.post("/signup", async (req, res) => {
  try {
    const { firstName,lastName , email,  password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists with this email" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = password ? await bcrypt.hash(password, salt) : undefined;

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Respond with success message (no token)
    res.status(201).json({
      msg: "User registered successfully",

    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "SQA@5000", { expiresIn: "8h" });

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours
      secure: process.env.NODE_ENV === "production", // send cookie only over HTTPS in production
      sameSite: "Strict",
    });

    // Success response
    res.status(200).json({
      message: "Login successful",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
