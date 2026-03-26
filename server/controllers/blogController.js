import Blog from "../models/Blog.js";
import slugify from "slugify";
import asyncHandler from "../middleware/asyncHandler.js";
import mongoose from "mongoose";

export const createBlog = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    featuredImage,
    seoTitle,
    seoDescription,
    isPublished,
    category,
    slug,
    isFeatured, // ✅ ADD THIS
    excerpt,
  } = req.body;

  const baseSlug = slugify(title, { lower: true });
  const uniqueSlug = `${baseSlug}-${Date.now()}`;

  // ✅ IF THIS BLOG IS FEATURED → RESET OTHERS
  if (isFeatured) {
    await Blog.updateMany({}, { isFeatured: false });
  }

  const blog = await Blog.create({
    title,
    content,
    featuredImage,
    seoTitle,
    seoDescription,
    isPublished,
    category,
    slug: uniqueSlug,
    isFeatured: isFeatured || false, // ✅ ADD THIS
    excerpt,
  });

  res.status(201).json({
    success: true,
    data: blog,
  });
});

/* =========================
   ADMIN: Get All Blogs
========================= */
export const getAllBlogsAdmin = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    data: blogs,
  });
});

/* =========================
   ADMIN: Update Blog
========================= */
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    const error = new Error("Blog not found");
    error.status = 404;
    throw error;
  }

  Object.assign(blog, req.body);

  if (req.body.isFeatured) {
    await Blog.updateMany({}, { isFeatured: false });
  }

  const updatedBlog = await blog.save();

  res.json({
    success: true,
    data: updatedBlog,
  });
});

/* =========================
   ADMIN: Delete Blog
========================= */
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    const error = new Error("Blog not found");
    error.status = 404;
    throw error;
  }

  await blog.deleteOne();

  res.json({
    success: true,
    message: "Blog deleted successfully",
  });
});

/* =========================
   PUBLIC: Get Published Blogs
========================= */
export const getPublishedBlogs = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const category = req.query.category;

  const filter = { isPublished: true };

  if (category && mongoose.Types.ObjectId.isValid(category)) {
    filter.category = category;
  }

  const totalItems = await Blog.countDocuments(filter);

  const blogs = await Blog.find(filter)
    .populate("category", "name slug")
    .sort({ isFeatured: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    success: true,
    data: blogs,
    pagination: {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      limit,
    },
  });
});

/* =========================
   PUBLIC: Get Single Blog
========================= */
export const getSingleBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({
    slug: req.params.slug,
    isPublished: true,
  });

  if (!blog) {
    const error = new Error("Blog not found");
    error.status = 404;
    throw error;
  }

  res.json({
    success: true,
    data: blog,
  });
});
