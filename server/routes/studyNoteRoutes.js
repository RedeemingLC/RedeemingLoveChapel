"use strict";

const express = require("express");
const { protectUser } = require("../middleware/userAuthMiddleware");
const { getNote, saveNote } = require("../controllers/studyNoteController");

const router = express.Router();

/* ========= STUDY NOTE ROUTES ========= */
router.get("/:studyId/day/:dayNumber", protectUser, getNote);
router.post("/:studyId/day/:dayNumber", protectUser, saveNote);

module.exports = router;
