import express from "express";
import {
  createBlog,
  getAllBlogsAdmin,
  updateBlog,
  deleteBlog,
  getPublishedBlogs,
  getSingleBlog,
} from "../controllers/blogController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===== ADMIN ROUTES ===== */

router.post("/", protect, adminOnly, createBlog);
router.get("/admin", protect, adminOnly, getAllBlogsAdmin);
router.put("/:id", protect, adminOnly, updateBlog);
router.delete("/:id", protect, adminOnly, deleteBlog);

/* ===== PUBLIC ROUTES ===== */

router.get("/", getPublishedBlogs);
router.get("/:slug", getSingleBlog);

export default router;
