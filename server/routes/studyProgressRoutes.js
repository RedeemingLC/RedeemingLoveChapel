"use strict";

const express = require("express");
const {
  getStudyProgress,
  markDayComplete,
} = require("../controllers/studyProgressController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* ========= STUDY PROGRESS ROUTES ========= */

// Get progress for study
router.get("/:studyId", protect, getStudyProgress);

// Mark day complete
router.post("/:studyId/day/:dayNumber", protect, markDayComplete);

module.exports = router;
