"use strict";

const express = require("express");
const {
  createContent,
  getContents,
  getContentBySlug,
  getFullContent,
  updateContent,
  deleteContent,
} = require("../controllers/contentController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* ========= ADMIN ROUTES ========= */
router.post("/", protect, adminOnly, createContent);
router.put("/:id", protect, adminOnly, updateContent);
router.delete("/:id", protect, adminOnly, deleteContent);

/* ========= PUBLIC ROUTES ========= */
router.get("/", getContents);
router.get("/:slug/full", getFullContent);
router.get("/:slug", getContentBySlug);

module.exports = router;
