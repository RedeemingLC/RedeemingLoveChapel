"use strict";

const multer = require("multer");
const path = require("path");

/* =========================
   Storage Configuration
========================= */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/manuals/");
  },
  filename(req, file, cb) {
    const safeName = file.originalname.replace(/\s+/g, "-").toLowerCase();

    cb(null, `manual-${Date.now()}${path.extname(safeName)}`);
  },
});

/* =========================
   File Filter - PDF Only
========================= */
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

/* =========================
   Upload Instance
========================= */
const pdfUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

module.exports = pdfUpload;
