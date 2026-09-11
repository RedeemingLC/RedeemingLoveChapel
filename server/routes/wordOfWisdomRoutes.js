"use strict";

const express = require("express");
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

// Main public endpoint
router.get("/active", getActiveWisdom);

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
