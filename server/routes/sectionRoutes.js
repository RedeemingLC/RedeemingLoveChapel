import express from "express";

import {
  createSection,
  updateSection,
  reorderSections,
  getSectionsByManual,
  deleteSection,
} from "../controllers/sectionController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin create section
router.post("/", protect, adminOnly, createSection);

// Update
router.put("/:id", protect, adminOnly, updateSection);

// Re-ordering
router.put("/reorder", protect, adminOnly, reorderSections);

// Get sections of a content item
router.get("/manual/:manualId", getSectionsByManual);

// Admin delete section
router.delete("/:id", protect, adminOnly, deleteSection);

export default router;
