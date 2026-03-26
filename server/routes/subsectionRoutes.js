import express from "express";

import {
  createSubsection,
  getSubsectionsBySection,
  reorderSubsections,
  deleteSubsection,
  updateSubsection,
} from "../controllers/subsectionController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create subsection
router.post("/", protect, adminOnly, createSubsection);

// Reorder subsections
router.put("/reorder", protect, adminOnly, reorderSubsections);

// Get subsections of a section
router.get("/:sectionId", getSubsectionsBySection);

// Update subsection
router.put("/:id", protect, adminOnly, updateSubsection);

// Delete subsection
router.delete("/:id", protect, adminOnly, deleteSubsection);

export default router;
