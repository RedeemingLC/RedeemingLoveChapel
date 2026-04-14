"use strict";

const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* ========= TEST ROUTES ========= */

// Test logged-in user
router.get("/user", protect, (req, res) => {
  res.json({
    message: "You are logged in",
    user: req.user,
  });
});

// Test admin-only
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "You are an admin",
  });
});

module.exports = router;
