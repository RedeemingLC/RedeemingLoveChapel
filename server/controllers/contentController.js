import Content from "../models/Content.js";
import Section from "../models/Section.js";
import Subsection from "../models/Subsection.js";
import slugify from "slugify";
import asyncHandler from "../middleware/asyncHandler.js";

// Create Content
export const createContent = asyncHandler(async (req, res) => {
  const { title, type, description, category, order } = req.body;

  const baseSlug = slugify(title, { lower: true });
  const slug = `${baseSlug}-${Date.now()}`;

  const content = await Content.create({
    title,
    slug,
    type,
    description,
    category,
    order: order || 0,
  });

  res.status(201).json({
    success: true,
    data: content,
  });
});

// Get All Content (Used for library pages).
export const getContents = asyncHandler(async (req, res) => {
  const { type } = req.query;

  const filter = type ? { type } : {};

  const contents = await Content.find(filter)
    .populate("category")
    .sort({ order: 1, createdAt: 1 });

  res.json({
    success: true,
    data: contents,
  });
});

// Get Single Content (Used for content landing pages).

export const getContentBySlug = asyncHandler(async (req, res) => {
  const content = await Content.findOne({ slug: req.params.slug }).populate(
    "category",
  );

  if (!content) {
    res.status(404);
    throw new Error("Content not found");
  }

  res.json({
    success: true,
    data: content,
  });
});

// Full Content Tree (This powers the Manual Reader Page).

export const getFullContent = asyncHandler(async (req, res) => {
  const content = await Content.findOne({ slug: req.params.slug });

  if (!content) {
    res.status(404);
    throw new Error("Content not found");
  }

  const sections = await Section.find({ content: content._id }).sort({
    order: 1,
  });

  const sectionIds = sections.map((section) => section._id);

  const subsections = await Subsection.find({
    section: { $in: sectionIds },
  }).sort({ order: 1, createdAt: 1 });

  const sectionsWithChildren = sections.map((section) => {
    const children = subsections.filter(
      (sub) => sub.section.toString() === section._id.toString(),
    );

    return {
      ...section.toObject(),
      subsections: children,
    };
  });

  res.json({
    success: true,
    data: {
      ...content.toObject(),
      sections: sectionsWithChildren,
    },
  });
});

// Update Content
export const updateContent = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id);

  if (!content) {
    res.status(404);
    throw new Error("Content not found");
  }

  content.title = req.body.title || content.title;
  content.type = req.body.type || content.type;
  content.description = req.body.description || content.description;
  content.order = req.body.order ?? content.order;

  const updatedContent = await content.save();

  res.json({
    success: true,
    data: updatedContent,
  });
});

//Delete content
export const deleteContent = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id);

  if (!content) {
    res.status(404);
    throw new Error("Content not found");
  }

  await content.deleteOne();

  res.json({
    success: true,
    message: "Content deleted",
  });
});
