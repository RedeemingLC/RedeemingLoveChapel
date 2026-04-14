"use strict";

const multer = require("multer");
const path = require("path");

/* =========================
   Storage Configuration
========================= */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

/* =========================
   File Filter - Images Only
========================= */
const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only"));
  }
};

/* =========================
   Multer Upload Instance
========================= */
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
