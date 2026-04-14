"use strict";

const express = require("express");
const {
  getStudies,
  getStudyById,
  getStudyDay,
  createStudy,
  updateStudy,
  deleteStudy,
} = require("../controllers/studyController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================================
   👥 USER ROUTES (Logged-in Users)
========================================= */

// GET /api/studies
router.get("/", protect, getStudies);

// GET /api/studies/:studyId/day/:dayNumber
router.get("/:studyId/day/:dayNumber", protect, getStudyDay);

// GET /api/studies/:studyId (entry / overview)
router.get("/:studyId", protect, getStudyById);

/* =========================================
   🔐 ADMIN ROUTES
========================================= */

// POST /api/studies
router.post("/", protect, adminOnly, createStudy);

// PUT /api/studies/:studyId
router.put("/:studyId", protect, adminOnly, updateStudy);

// DELETE /api/studies/:studyId
router.delete("/:studyId", protect, adminOnly, deleteStudy);

module.exports = router;
