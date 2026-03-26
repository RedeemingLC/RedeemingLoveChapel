import express from "express";

import {
  createContent,
  getContents,
  getContentBySlug,
  getFullContent,
  updateContent,
  deleteContent,
} from "../controllers/contentController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin create content
router.post("/", protect, adminOnly, createContent);

// Public: get all content
router.get("/", getContents);

// Public: get content by slug
router.get("/:slug", getContentBySlug);

// Public: get full content tree
router.get("/:slug/full", getFullContent);

// Update Content
router.put("/:id", protect, adminOnly, updateContent);

// Delete content
router.delete("/:id", protect, adminOnly, deleteContent);

export default router;
