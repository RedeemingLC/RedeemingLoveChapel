"use strict";

const Study = require("../models/Study");

/* =========================
   Get Published Study By Slug
========================= */
const getPublicStudy = async (req, res) => {
  try {
    const study = await Study.findOne({
      slug: req.params.slug,
      isPublished: true,
    })
      .select(
        "title slug description topic entryTitle entrySubtitle entryContent coverImage createdAt",
      )
      .lean();

    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    res.json(study);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   Get All Published Studies
========================= */
const getAllPublicStudies = async (req, res) => {
  try {
    const studies = await Study.find({ isPublished: true })
      .select(
        "title slug description topic entryTitle entrySubtitle coverImage createdAt",
      )
      .sort({ createdAt: -1 });

    res.json(studies);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   Get Specific Day By dayNumber
========================= */
const getPublicStudyDay = async (req, res) => {
  try {
    const { slug, dayNumber } = req.params;

    const study = await Study.findOne({
      slug,
      isPublished: true,
    }).lean();

    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    if (!study.days || study.days.length === 0) {
      return res.status(404).json({
        message: "No study days found",
      });
    }

    const day = study.days.find((d) => d.dayNumber === Number(dayNumber));

    if (!day) {
      return res.status(404).json({ message: "Day not found" });
    }

    const totalDays = study.days.length;

    res.json({
      ...day,
      totalDays,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   Get Completion Screen
========================= */
const getCompletionScreen = async (req, res) => {
  try {
    const study = await Study.findOne({
      slug: req.params.slug,
      isPublished: true,
    }).lean();

    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    const totalDays = study.days?.length || 0;

    res.json({
      message: "Study completed",
      totalDays,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   Get Study Overview
========================= */
const getStudyOverview = async (req, res) => {
  try {
    const study = await Study.findOne({
      slug: req.params.slug,
      isPublished: true,
    }).lean();

    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    const days = (study.days || []).map((day) => ({
      dayNumber: day.dayNumber,
      title: day.title,
    }));

    res.json({
      studyId: study._id,
      totalDays: study.days?.length || 0,
      days,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getPublicStudy,
  getAllPublicStudies,
  getPublicStudyDay,
  getCompletionScreen,
  getStudyOverview,
};
