import express from "express";
import { protectUser } from "../middleware/userAuthMiddleware.js";
import { getNote, saveNote } from "../controllers/studyNoteController.js";

const router = express.Router();

router.get("/:studyId/day/:dayNumber", protectUser, getNote);
router.post("/:studyId/day/:dayNumber", protectUser, saveNote);

export default router;
