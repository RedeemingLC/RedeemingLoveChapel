"use strict";

const mongoose = require("mongoose");

const studySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    entryTitle: {
      type: String,
      default: "",
    },
    entrySubtitle: {
      type: String,
      default: "",
    },
    entryContent: {
      type: String,
      default: "",
    },
    days: [
      {
        dayNumber: {
          type: Number,
        },
        title: {
          type: String,
        },
        reflectionPrompt: {
          type: String,
          default: "",
        },
        hasPauseDivider: {
          type: Boolean,
          default: true,
        },
        pauseText: {
          type: String,
          default: "Pause & Reflect",
        },
        content: {
          type: String,
          default: "",
        },
      },
    ],
    topic: {
      type: String,
      default: "General",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    coverImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Study = mongoose.model("Study", studySchema);

module.exports = Study;
