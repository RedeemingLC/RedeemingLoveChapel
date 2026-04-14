"use strict";

const express = require("express");
const {
  createAudio,
  getAllAudioAdmin,
  updateAudio,
  deleteAudio,
  getPublishedAudio,
} = require("../controllers/audioController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* ========= ADMIN ROUTES ========= */
router.post("/", protect, adminOnly, createAudio);
router.get("/admin", protect, adminOnly, getAllAudioAdmin);
router.put("/:id", protect, adminOnly, updateAudio);
router.delete("/:id", protect, adminOnly, deleteAudio);

/* ========= PUBLIC ROUTE ========= */
router.get("/", getPublishedAudio);

module.exports = router;
