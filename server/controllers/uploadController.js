"use strict";

const multer = require("multer");
const path = require("path");
const fs = require("fs");

/* =========================
   Ensure Upload Folders Exist
========================= */
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDir("uploads/manuals");
ensureDir("uploads/images");

/* =========================
   Storage Configuration
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, "uploads/manuals/");
    } else {
      cb(null, "uploads/images/");
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

/* =========================
   Multer Upload Instance
========================= */
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

/* =========================
   Upload Handlers
========================= */
const uploadManual = upload.single("file");
const uploadManualCover = upload.single("file");

/* =========================
   Upload File Controller
========================= */
const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = `/uploads/${
    req.file.mimetype === "application/pdf" ? "manuals" : "images"
  }/${req.file.filename}`;

  res.status(200).json({
    filePath,
    imageUrl: `${process.env.SERVER_URL || "http://localhost:5000"}${filePath}`,
  });
};

module.exports = {
  uploadManual,
  uploadManualCover,
  uploadFile,
};
