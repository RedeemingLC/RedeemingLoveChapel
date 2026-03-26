import express from "express";
import {
  getStudies,
  getStudyById,
  getStudyDay,
  createStudy,
  updateStudy,
  deleteStudy,
} from "../controllers/studyController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================
   👥 USER ROUTES (Logged-in users)
========================================= */

// GET /api/studies
router.get("/", protect, getStudies);

// GET /api/studies/:studyId (entry / overview)
router.get("/:studyId", protect, getStudyById);

// 🔒 GET /api/studies/:studyId/day/:dayNumber
router.get("/:studyId/day/:dayNumber", protect, getStudyDay);

/* =========================================
   🔐 ADMIN ROUTES
========================================= */

// POST /api/studies
router.post("/", protect, adminOnly, createStudy);

// PUT /api/studies/:studyId
router.put("/:studyId", protect, adminOnly, updateStudy);

// DELETE /api/studies/:studyId
router.delete("/:studyId", protect, adminOnly, deleteStudy);

export default router;
