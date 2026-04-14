"use strict";

const mongoose = require("mongoose");

const studyProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    study: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Study",
      required: true,
    },
    completedDays: {
      type: [Number],
      default: [],
    },
    lastDayRead: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

/* =========================
   One Progress Doc Per User Per Study
========================= */
studyProgressSchema.index({ user: 1, study: 1 }, { unique: true });

const StudyProgress = mongoose.model("StudyProgress", studyProgressSchema);

module.exports = StudyProgress;
