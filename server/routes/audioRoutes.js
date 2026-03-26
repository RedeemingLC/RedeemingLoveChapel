import express from "express";
import {
  createAudio,
  getAllAudioAdmin,
  updateAudio,
  deleteAudio,
  getPublishedAudio,
} from "../controllers/audioController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ========= ADMIN ROUTES ========= */

router.post("/", protect, adminOnly, createAudio);
router.get("/admin", protect, adminOnly, getAllAudioAdmin);
router.put("/:id", protect, adminOnly, updateAudio);
router.delete("/:id", protect, adminOnly, deleteAudio);

/* ========= PUBLIC ROUTE ========= */

router.get("/", getPublishedAudio);

export default router;
