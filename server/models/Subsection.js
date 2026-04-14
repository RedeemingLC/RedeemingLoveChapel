"use strict";

const mongoose = require("mongoose");

const subsectionSchema = new mongoose.Schema(
  {
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    blocks: [
      {
        id: {
          type: String,
        },
        type: {
          type: String,
          required: true,
        },
        value: mongoose.Schema.Types.Mixed,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Subsection = mongoose.model("Subsection", subsectionSchema);

module.exports = Subsection;
