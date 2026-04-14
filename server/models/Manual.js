"use strict";

const mongoose = require("mongoose");
const slugify = require("slugify");

const manualSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
    content: {
      type: String,
      default: "",
    },
    fileUrl: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

/* =========================
   Auto Generate Slug
   Before Saving
========================= */
manualSchema.pre("save", function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

const Manual = mongoose.model("Manual", manualSchema);

module.exports = Manual;
