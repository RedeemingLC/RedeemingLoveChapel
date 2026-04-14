"use strict";

const Subsection = require("../models/Subsection");
const asyncHandler = require("../middleware/asyncHandler");

/* =========================
   Create Subsection
========================= */
const createSubsection = asyncHandler(async (req, res) => {
  const { sectionId, title, blocks, order } = req.body;

  const subsection = await Subsection.create({
    section: sectionId,
    title,
    blocks,
    order,
  });

  res.status(201).json({
    success: true,
    data: subsection,
  });
});

/* =========================
   Update Subsection
========================= */
const updateSubsection = asyncHandler(async (req, res) => {
  const subsection = await Subsection.findById(req.params.id);

  if (!subsection) {
    res.status(404);
    throw new Error("Subsection not found");
  }

  subsection.title = req.body.title || subsection.title;
  subsection.blocks = req.body.blocks || subsection.blocks;
  subsection.order = req.body.order ?? subsection.order;

  const updatedSubsection = await subsection.save();

  res.json({
    success: true,
    data: updatedSubsection,
  });
});

/* =========================
   Reorder Subsections
========================= */
const reorderSubsections = asyncHandler(async (req, res) => {
  const updates = req.body;

  const updatePromises = updates.map((item) =>
    Subsection.findByIdAndUpdate(item.id, { order: item.order }),
  );

  await Promise.all(updatePromises);

  res.json({
    success: true,
    message: "Subsections reordered successfully",
  });
});

/* =========================
   Get Subsections By Section
========================= */
const getSubsectionsBySection = asyncHandler(async (req, res) => {
  const subsections = await Subsection.find({
    section: req.params.sectionId,
  }).sort({ order: 1, createdAt: 1 });

  res.json({
    success: true,
    data: subsections,
  });
});

/* =========================
   Delete Subsection
========================= */
const deleteSubsection = asyncHandler(async (req, res) => {
  const subsection = await Subsection.findById(req.params.id);

  if (!subsection) {
    res.status(404);
    throw new Error("Subsection not found");
  }

  await subsection.deleteOne();

  res.json({
    success: true,
    message: "Subsection deleted",
  });
});

module.exports = {
  createSubsection,
  updateSubsection,
  reorderSubsections,
  getSubsectionsBySection,
  deleteSubsection,
};
