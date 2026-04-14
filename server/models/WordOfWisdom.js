"use strict";

const mongoose = require("mongoose");

const wordOfWisdomSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "Unknown",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    lastActivatedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const WordOfWisdom = mongoose.model("WordOfWisdom", wordOfWisdomSchema);

module.exports = WordOfWisdom;
