import express from "express";
import {
  getAllPublicStudies,
  getPublicStudy,
  getPublicStudyDay,
  getCompletionScreen,
  getStudyOverview,
} from "../controllers/publicStudyController.js";

const router = express.Router();

// =========================
// 📚 PUBLIC STUDY ROUTES
// =========================

// 🔹 List all studies
router.get("/", getAllPublicStudies);

// 🔹 Study overview (list of days)
router.get("/:slug/overview", getStudyOverview);

// 🔹 Get a specific day
router.get("/:slug/day/:dayNumber", getPublicStudyDay);

// 🔹 Completion screen
router.get("/:slug/completion", getCompletionScreen);

// 🔹 Study entry (MUST BE LAST)
router.get("/:slug", getPublicStudy);

export default router;
