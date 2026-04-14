"use strict";

const Study = require("../models/Study");
const UserStudyProgress = require("../models/UserStudyProgress");

/* ======================================================
   📚 Get All Studies (Admin / Listing)
====================================================== */
const getStudies = async (req, res) => {
  try {
    const studies = await Study.find()
      .select("title slug description isPublished createdAt")
      .sort({ createdAt: -1 });

    res.json(studies);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   📖 Get Study Entry / Overview
====================================================== */
const getStudyById = async (req, res) => {
  try {
    const study = await Study.findById(req.params.studyId).select(
      "title slug description topic entryTitle entrySubtitle entryContent days isPublished createdAt updatedAt",
    );

    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    res.json(study);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   🔒 Get Single Study Day (Lock Future Days)
====================================================== */
const getStudyDay = async (req, res) => {
  try {
    const { studyId, dayNumber } = req.params;
    const userId = req.user.id;
    const dayNum = Number(dayNumber);

    // 1️⃣ Fetch user progress
    const progress = await UserStudyProgress.findOne({
      userId,
      studyId,
    });

    let unlockedDay = 1;

    if (progress && progress.completedDays.length > 0) {
      unlockedDay = Math.max(...progress.completedDays) + 1;
    }

    // 2️⃣ Enforce lock
    if (dayNum > unlockedDay) {
      return res.status(403).json({
        message: "Complete the previous day to unlock this study.",
      });
    }

    // 3️⃣ Fetch study
    const study = await Study.findById(studyId).select(
      "title slug description coverImage topic days isPublished createdAt",
    );

    if (!study || !study.isPublished) {
      return res.status(404).json({ message: "Study not found" });
    }

    const day = study.days.find((d) => d.dayNumber === dayNum);

    if (!day) {
      return res.status(404).json({ message: "Study day not found" });
    }

    res.json({
      studyId: study._id,
      title: study.title,
      slug: study.slug,
      dayNumber: day.dayNumber,
      dayTitle: day.title,
      content: day.content || "",
      reflectionPrompt: day.reflectionPrompt || "",
      hasPauseDivider: day.hasPauseDivider ?? true,
      pauseText: day.pauseText || "Pause & Reflect",
    });
  } catch (error) {
    console.error("getStudyDay error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   ➕ Create New Study
====================================================== */
const createStudy = async (req, res) => {
  try {
    const { title, slug, description, topic } = req.body; // ✅ BUG 1 FIXED - added topic

    const existing = await Study.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    const study = await Study.create({
      title,
      slug,
      description,
      topic,
      entryTitle: "",
      entrySubtitle: "",
      entryContent: "",
      days: [],
      isPublished: false,
    });

    res.status(201).json(study);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   ✏️ Update Study
====================================================== */
const updateStudy = async (req, res) => {
  try {
    const study = await Study.findById(req.params.studyId);

    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    const fields = [
      "title",
      "description",
      "entryTitle",
      "entrySubtitle",
      "entryContent",
      "days",
      "isPublished",
      "coverImage",
      "topic",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        // ✅ BUG 2 FIXED - added undefined
        study[field] = req.body[field];
      }
    });

    const updatedStudy = await study.save();
    res.json(updatedStudy);
  } catch (error) {
    console.error("updateStudy error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   ❌ Delete Study
====================================================== */
const deleteStudy = async (req, res) => {
  try {
    const study = await Study.findById(req.params.studyId);

    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    await study.deleteOne();
    res.json({ message: "Study deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getStudies,
  getStudyById,
  getStudyDay,
  createStudy,
  updateStudy,
  deleteStudy,
};
