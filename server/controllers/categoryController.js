import Category from "../models/Category.js";
import slugify from "slugify";
import asyncHandler from "../middleware/asyncHandler.js";

/* CREATE CATEGORY */
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const existing = await Category.findOne({ name });
  if (existing) {
    throw new Error("Category already exists");
  }

  const slug = slugify(name, { lower: true });

  const category = await Category.create({ name, slug });

  res.status(201).json({
    success: true,
    data: category,
  });
});

/* GET ALL CATEGORIES */
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    data: categories,
  });
});

// Update Categories

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new Error("Category not found");
  }

  category.name = req.body.name;
  category.slug = slugify(req.body.name, { lower: true });

  const updated = await category.save();

  res.json({
    success: true,
    data: updated,
  });
});

/* DELETE CATEGORY */
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) throw new Error("Category not found");

  await category.deleteOne();

  res.json({ success: true, message: "Category deleted" });
});
