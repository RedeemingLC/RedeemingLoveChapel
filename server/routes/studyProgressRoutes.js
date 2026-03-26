import express from "express";
import {
  getStudyProgress,
  markDayComplete,
} from "../controllers/studyProgressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get progress for study
router.get("/:studyId", protect, getStudyProgress);

// Mark day complete
router.post("/:studyId/day/:dayNumber", protect, markDayComplete);

export default router;
