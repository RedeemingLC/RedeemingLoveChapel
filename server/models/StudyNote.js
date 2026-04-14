"use strict";

const mongoose = require("mongoose");

const studyNoteSchema = new mongoose.Schema(
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
    dayNumber: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

/* =========================
   One Note Per User Per Day
========================= */
studyNoteSchema.index({ user: 1, study: 1, dayNumber: 1 }, { unique: true });

const StudyNote = mongoose.model("StudyNote", studyNoteSchema);

module.exports = StudyNote;
