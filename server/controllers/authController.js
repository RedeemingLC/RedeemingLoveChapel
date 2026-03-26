import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
import crypto from "crypto"; // ✅ ADD THIS
import asyncHandler from "../middleware/asyncHandler.js";

// 🔑 Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// 📝 Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("User already exists");
    error.status = 400;
    throw error;
  }

  const emailToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    emailVerificationToken: emailToken,
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

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  if (!user.emailVerified) {
    const error = new Error("Please verify your email before logging in");
    error.status = 401;
    throw error;
  }

  res.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    },
  });
});

// 🔁 Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ message: "No user with that email" });

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  console.log("🔐 PASSWORD RESET LINK:", resetUrl);

  await sendEmail({
    to: user.email,
    subject: "Password Reset",
    text: `Reset your password here: ${resetUrl}`,
  });

  res.json({ message: "Password reset email sent" });
};

// 🔐 Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  user.password = password; // Let model hash it
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
};

//Verify Email before log in
export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({
    emailVerificationToken: token,
  });

  // ✅ If already verified, do NOT fail
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
