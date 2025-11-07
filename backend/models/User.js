// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    dateOfBirth: {
      type: Date,
    },
    image: {
      type: String, // can store a URL or base64 string
      default: "",
    },
    backgroundImage: {
      type: String, // can store a URL or base64 string
      
    },
    bio: {
      type: String,
      maxlength: 300,
      trim: true,
    },
    interests: [
      {
        type: String,
        trim: true,
      },
    ],
    socialLinks: {
      facebook: { type: String, trim: true },
      instagram: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      twitter: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
