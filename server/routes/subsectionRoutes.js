"use strict";

const express = require("express");
const {
  createSubsection,
  getSubsectionsBySection,
  reorderSubsections,
  deleteSubsection,
  updateSubsection,
} = require("../controllers/subsectionController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* ========= ADMIN ROUTES ========= */
router.post("/", protect, adminOnly, createSubsection);
router.put("/reorder", protect, adminOnly, reorderSubsections);
router.put("/:id", protect, adminOnly, updateSubsection);
router.delete("/:id", protect, adminOnly, deleteSubsection);

/* ========= PUBLIC ROUTES ========= */
router.get("/:sectionId", getSubsectionsBySection);

module.exports = router;
