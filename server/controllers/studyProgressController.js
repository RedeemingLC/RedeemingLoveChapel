"use strict";

const StudyProgress = require("../models/StudyProgress");
const Study = require("../models/Study");

/* =========================
   Get User Progress For A Study
========================= */
const getStudyProgress = async (req, res) => {
  const { studyId } = req.params;

  const progress = await StudyProgress.findOne({
    user: req.user._id,
    study: studyId,
  });

  if (!progress) {
    return res.json({
      completedDays: [],
      lastDayRead: 1,
    });
  }

  res.json(progress);
};

/* =========================
   Mark A Day Complete
========================= */
const markDayComplete = async (req, res) => {
  const { studyId, dayNumber } = req.params;
  const dayNum = Number(dayNumber);

  // 🔍 Get study (to validate total days)
  const study = await Study.findById(studyId);

  if (!study) {
    return res.status(404).json({ message: "Study not found" });
  }

  const totalDays = study.days.length;

  if (dayNum < 1 || dayNum > totalDays) {
    return res.status(400).json({ message: "Invalid day number" });
  }

  let progress = await StudyProgress.findOne({
    user: req.user._id,
    study: studyId,
  });

  // 🆕 First time user
  if (!progress) {
    if (dayNum !== 1) {
      return res.status(403).json({
        message: "You must start from Day 1",
      });
    }

    progress = await StudyProgress.create({
      user: req.user._id,
      study: studyId,
      completedDays: [1],
      lastDayRead: 1,
    });

    return res.json(progress);
  }

  // 🔒 Locking Logic
  const maxCompleted = Math.max(...progress.completedDays);
  const allowedDay = maxCompleted + 1;

  if (dayNum > allowedDay) {
    return res.status(403).json({
      message: "You cannot skip ahead",
    });
  }

  // ✅ Mark Complete
  if (!progress.completedDays.includes(dayNum)) {
    progress.completedDays.push(dayNum);
  }

  progress.lastDayRead = dayNum;

  await progress.save();

  res.json(progress);
};

module.exports = {
  getStudyProgress,
  markDayComplete,
};
