"use strict";

const Category = require("../models/Category");
const slugify = require("slugify");
const asyncHandler = require("../middleware/asyncHandler");

/* CREATE CATEGORY */
const createCategory = asyncHandler(async (req, res) => {
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
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    data: categories,
  });
});

/* UPDATE CATEGORY */
const updateCategory = asyncHandler(async (req, res) => {
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
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) throw new Error("Category not found");

  await category.deleteOne();

  res.json({ success: true, message: "Category deleted" });
});

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
