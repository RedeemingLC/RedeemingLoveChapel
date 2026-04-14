"use strict";

const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    speaker: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["Sermon", "Prayer Week", "Teaching", "Special Program"],
      default: "Sermon",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Audio = mongoose.model("Audio", audioSchema);

module.exports = Audio;
