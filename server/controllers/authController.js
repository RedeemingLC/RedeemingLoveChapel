"use strict";

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const asyncHandler = require("../middleware/asyncHandler");

// 🔑 Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// 📝 Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("User already exists");
    error.status = 400;
    throw error;
  }

  const emailToken = crypto.randomBytes(32).toString("hex");

  // 🔐 HASH TOKEN BEFORE SAVING
  const hashedToken = crypto
    .createHash("sha256")
    .update(emailToken)
    .digest("hex");

  const user = await User.create({
    name,
    email,
    password,
    emailVerificationToken: hashedToken,
  });

  const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${emailToken}`;

  await sendEmail({
    to: user.email,
    subject: "Verify your email",
    text: `Please verify your email by clicking this link: ${verifyUrl}`,
  });

  res.status(201).json({
    success: true,
    message:
      "Registration successful. Please check your email to verify your account.",
  });
});

// 🔓 Login User (STEP 3 - COOKIE VERSION)
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password)) || !user.emailVerified) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = generateToken(user._id);

  // ✅ SET COOKIE
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ✅ HTTPS in prod
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  // ✅ SEND USER ONLY (NO TOKEN)
  res.json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// 🔁 Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // Always respond the same way
  if (!user) {
    return res.json({
      message:
        "If an account with that email exists, a reset link has been sent.",
    });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  // console.log("🔐 PASSWORD RESET LINK:", resetUrl);

  await sendEmail({
    to: user.email,
    subject: "Password Reset",
    text: `Reset your password here: ${resetUrl}`,
  });

  res.json({
    message:
      "If an account with that email exists, a reset link has been sent.",
  });
};

// 🔐 Reset Password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
};

// ✅ Verify Email before log in
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  // 🔐 HASH TOKEN BEFORE COMPARING
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
  });

  if (!user) {
    return res.json({
      message: "Email already verified",
    });
  }

  user.emailVerified = true;
  user.emailVerificationToken = undefined;

  await user.save();

  res.json({ message: "Email verified successfully" });
};

// 🔒 Logout User
const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(0),
    path: "/", // ✅ ensure it clears globally
  });

  res.json({ success: true, message: "Logged out successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  logoutUser,
};
