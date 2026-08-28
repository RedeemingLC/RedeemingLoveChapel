"use strict";

const multer = require("multer");
const path = require("path");

/* =========================
   Storage Configuration
========================= */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/images/");
  },
  filename(req, file, cb) {
    const safeName = file.originalname.replace(/\s+/g, "-").toLowerCase();

    cb(null, `image-${Date.now()}${path.extname(safeName)}`);
  },
});

/* =========================
   File Filter - Images Only
========================= */
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, WEBP images allowed"), false);
  }
};

/* =========================
   Upload Instance
========================= */
const imageUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

module.exports = imageUpload;
