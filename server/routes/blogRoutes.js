"use strict";

const express = require("express");
const {
  createBlog,
  getAllBlogsAdmin,
  updateBlog,
  deleteBlog,
  getPublishedBlogs,
  getSingleBlog,
} = require("../controllers/blogController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* ========= ADMIN ROUTES ========= */
router.post("/", protect, adminOnly, createBlog);
router.get("/admin", protect, adminOnly, getAllBlogsAdmin);
router.put("/:id", protect, adminOnly, updateBlog);
router.delete("/:id", protect, adminOnly, deleteBlog);

/* ========= PUBLIC ROUTES ========= */
router.get("/", getPublishedBlogs);
router.get("/:slug", getSingleBlog);

module.exports = router;
