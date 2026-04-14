"use strict";

const express = require("express");
const WordOfWisdom = require("../models/WordOfWisdom");
const {
  getActiveWisdom,
  deactivateWisdom,
  getAllWisdom,
  createWisdom,
  updateWisdom,
  deleteWisdom,
  setActiveWisdom,
} = require("../controllers/wordOfWisdomController");

const router = express.Router();

/* ================= PUBLIC ================= */

// Main public endpoint (use this in frontend)
router.get("/active", async (req, res) => {
  try {
    const wisdom = await WordOfWisdom.findOne({ isActive: true });

    if (!wisdom) {
      return res.status(404).json({ message: "No active wisdom found" });
    }

    res.json(wisdom);
  } catch (error) {
    console.error("ACTIVE WISDOM ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= ADMIN ================= */

// Disable caching for admin routes
router.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

router.get("/admin/wisdom", getAllWisdom);
router.post("/admin/wisdom", createWisdom);
router.put("/admin/wisdom/:id", updateWisdom);
router.delete("/admin/wisdom/:id", deleteWisdom);
router.patch("/admin/wisdom/:id/activate", setActiveWisdom);
router.patch("/admin/wisdom/:id/deactivate", deactivateWisdom);

module.exports = router;
