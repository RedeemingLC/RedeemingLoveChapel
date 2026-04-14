"use strict";

const express = require("express");
const {
  createManual,
  getAllManualsAdmin,
  updateManual,
  deleteManual,
  getPublishedManuals,
  getSingleManual,
} = require("../controllers/manualController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* ========= PUBLIC ROUTES ========= */
router.get("/published", getPublishedManuals);
router.get("/slug/:slug", getSingleManual);

/* ========= ADMIN ROUTES ========= */
router.post("/", protect, adminOnly, createManual);
router.get("/admin", protect, adminOnly, getAllManualsAdmin);
router.put("/:id", protect, adminOnly, updateManual);
router.delete("/:id", protect, adminOnly, deleteManual);

module.exports = router;
