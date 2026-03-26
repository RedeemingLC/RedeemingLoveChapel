import express from "express";

import {
  createManual,
  getAllManualsAdmin,
  updateManual,
  deleteManual,
  getPublishedManuals,
  getSingleManual,
} from "../controllers/manualController.js";

// import {
//   uploadManual,
//   uploadManualCover,
// } from "../controllers/uploadController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===== PUBLIC ROUTES ===== */

router.get("/published", getPublishedManuals);
router.get("/slug/:slug", getSingleManual);

/* ===== UPLOAD IMAGES AND MANUALS ROUTES ===== */

// router.post("/upload/manual", uploadManual, (req, res) => {
//   res.json({ fileUrl: `/uploads/manuals/${req.file.filename}` });
// });

// router.post("/upload/manual-cover", uploadManualCover, (req, res) => {
//   res.json({ fileUrl: `/uploads/images/${req.file.filename}` });
// });

/* ===== ADMIN ROUTES ===== */

router.post("/", protect, adminOnly, createManual);
router.get("/admin", protect, adminOnly, getAllManualsAdmin);
router.put("/:id", protect, adminOnly, updateManual);
router.delete("/:id", protect, adminOnly, deleteManual);

export default router;
