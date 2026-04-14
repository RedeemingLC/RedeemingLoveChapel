"use strict";

const express = require("express");
const {
  createSection,
  updateSection,
  reorderSections,
  getSectionsByManual,
  deleteSection,
} = require("../controllers/sectionController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* ========= ADMIN ROUTES ========= */
router.post("/", protect, adminOnly, createSection);
router.put("/reorder", protect, adminOnly, reorderSections);
router.put("/:id", protect, adminOnly, updateSection);
router.delete("/:id", protect, adminOnly, deleteSection);

/* ========= PUBLIC ROUTES ========= */
router.get("/manual/:manualId", getSectionsByManual);

module.exports = router;
