"use strict";

const Section = require("../models/Section");
const asyncHandler = require("../middleware/asyncHandler");

/* =========================
   Create Section
========================= */
const createSection = asyncHandler(async (req, res) => {
  const { manualId, title, order } = req.body;

  const section = await Section.create({
    manual: manualId,
    title,
    order,
  });

  res.status(201).json({
    success: true,
    data: section,
  });
});

/* =========================
   Get Sections of Content
========================= */
const getSectionsByManual = asyncHandler(async (req, res) => {
  const { manualId } = req.params;

  const sections = await Section.find({ manual: manualId }).sort({ order: 1 });

  res.json({
    success: true,
    data: sections,
  });
});

/* =========================
   Update Section
========================= */
const updateSection = asyncHandler(async (req, res) => {
  const { title, order } = req.body;

  const section = await Section.findById(req.params.id);

  if (!section) {
    res.status(404);
    throw new Error("Section not found");
  }

  section.title = title ?? section.title;
  section.order = order ?? section.order;

  await section.save();

  res.json({
    success: true,
    data: section,
  });
});

/* =========================
   Delete Section
========================= */
const deleteSection = asyncHandler(async (req, res) => {
  const section = await Section.findById(req.params.id);

  if (!section) {
    res.status(404);
    throw new Error("Section not found");
  }

  await section.deleteOne();

  res.json({
    success: true,
    message: "Section deleted",
  });
});

/* =========================
   Reorder Sections
========================= */
const reorderSections = asyncHandler(async (req, res) => {
  const updates = req.body;

  const updatePromises = updates.map((item) =>
    Section.findByIdAndUpdate(item.id, { order: item.order }),
  );

  await Promise.all(updatePromises);

  res.json({
    success: true,
    message: "Sections reordered successfully",
  });
});

module.exports = {
  createSection,
  getSectionsByManual,
  updateSection,
  deleteSection,
  reorderSections,
};
