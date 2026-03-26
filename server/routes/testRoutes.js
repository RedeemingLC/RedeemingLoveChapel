import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

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

export default router;
