import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  uploadManual,
  uploadManualCover,
  uploadFile,
} from "../controllers/uploadController.js";
import multer from "multer";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔥 EXISTING: Blog images (KEEP THIS)
router.post("/", protect, adminOnly, upload.single("image"), (req, res) => {
  res.status(200).json({
    success: true,
    imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
  });
});

// 🔥 NEW: Manual PDF upload
router.post("/manual", protect, adminOnly, uploadManual, (req, res) => {
  res.json({ fileUrl: `/uploads/manuals/${req.file.filename}` });
});

// 🔥 NEW: Manual cover image
router.post(
  "/manual-cover",
  protect,
  adminOnly,
  uploadManualCover,
  (req, res) => {
    res.json({ fileUrl: `/uploads/images/${req.file.filename}` });
  },
);

router.post("/upload", upload.single("file"), uploadFile);

export default router;
