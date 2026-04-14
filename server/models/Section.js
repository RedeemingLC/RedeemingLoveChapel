"use strict";

const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
  {
    manual: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manual",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

/* =========================
   Index For Faster Queries
========================= */
sectionSchema.index({ manual: 1, order: 1 });

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
