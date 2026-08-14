"use strict";

const express = require("express");
const rateLimit = require("express-rate-limit");

const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  logoutUser,
} = require("../controllers/authController");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many login attempts. Try again later.",
    });
  },
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many reset requests. Please try again later.",
    });
  },
});

/* ========= AUTH ROUTES ========= */

router.post("/register", registerUser);

router.post("/login", loginLimiter, loginUser);

router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);

router.post("/reset-password/:token", resetPassword);
router.put("/reset-password/:token", resetPassword);

router.get("/verify-email/:token", verifyEmail);

router.post("/logout", logoutUser);

router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
