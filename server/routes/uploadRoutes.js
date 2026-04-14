"use strict";

const express = require("express");
const multer = require("multer");
const upload = require("../middleware/uploadMiddleware");
const {
  uploadManual,
  uploadManualCover,
  uploadFile,
} = require("../controllers/uploadController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* ========= UPLOAD ROUTES ========= */

// 🔥 Blog images upload
router.post("/", protect, adminOnly, upload.single("image"), (req, res) => {
  res.status(200).json({
    success: true,
    imageUrl: `${process.env.SERVER_URL || "http://localhost:5000"}/uploads/${
      req.file.filename
    }`,
  });
});

// 🔥 Manual PDF upload
router.post("/manual", protect, adminOnly, uploadManual, (req, res) => {
  res.json({ fileUrl: `/uploads/manuals/${req.file.filename}` });
});

// 🔥 Manual cover image upload
router.post(
  "/manual-cover",
  protect,
  adminOnly,
  uploadManualCover,
  (req, res) => {
    res.json({ fileUrl: `/uploads/images/${req.file.filename}` });
  },
);

// 🔥 General file upload
router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
