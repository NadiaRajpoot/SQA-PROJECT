// routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const userAuth = require("../middlewares/userAuth.js")



// ---------------- VIEW LOGGED-IN USER PROFILE ----------------
router.get("/view", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Logged-in user profile fetched successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ---------------- UPDATE PROFILE ----------------
router.put("/update", userAuth , async (req, res) => {
  try {
   
    const updateData = req.body;
    const loggedInUser = req.user;

    // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      loggedInUser._id,
      { $set: updateData },
      { new: true, runValidators: true } // return updated document & validate fields
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});




// ---------------- DELETE LOGGED-IN USER PROFILE ----------------
router.delete("/delete", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Delete the logged-in user
    const deletedUser = await User.findByIdAndDelete(loggedInUser._id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Your profile has been deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
