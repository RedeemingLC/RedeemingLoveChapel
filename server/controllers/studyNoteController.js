"use strict";

const StudyNote = require("../models/StudyNote");

/* =========================
   Get Note For A Specific Day
========================= */
const getNote = async (req, res) => {
  const { studyId, dayNumber } = req.params;

  const note = await StudyNote.findOne({
    user: req.user._id,
    study: studyId,
    dayNumber,
  });

  res.json(note || { content: "" });
};

/* =========================
   Create Or Update Note
========================= */
const saveNote = async (req, res) => {
  const { studyId, dayNumber } = req.params;
  const { content } = req.body;

  const note = await StudyNote.findOneAndUpdate(
    { user: req.user._id, study: studyId, dayNumber },
    { content },
    { upsert: true, new: true },
  );

  res.json(note);
};

module.exports = {
  getNote,
  saveNote,
};
