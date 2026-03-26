import Section from "../models/Section.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Create Section
export const createSection = asyncHandler(async (req, res) => {
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

// Get Sections of Content
export const getSectionsByManual = asyncHandler(async (req, res) => {

  const { manualId } = req.params;

  const sections = await Section
    .find({ manual: manualId })
    .sort({ order: 1 });

  res.json({
    success: true,
    data: sections,
  });

});

// Update Section
export const updateSection = asyncHandler(async (req, res) => {
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

// Delete Section (Needed for Admin CMS)
export const deleteSection = asyncHandler(async (req, res) => {
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

// Reorder

export const reorderSections = asyncHandler(async (req, res) => {
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
