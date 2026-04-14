"use strict";

const slugify = require("slugify");
const Manual = require("../models/Manual");

/* =========================
   ADMIN: Create Manual
========================= */
const createManual = async (req, res, next) => {
  try {
    console.log("CATEGORY RECEIVED:", req.body.category);
    const { title, description, content, fileUrl, coverImage, category } =
      req.body;

    const manual = new Manual({
      title,
      description,
      content,
      fileUrl,
      coverImage,
      category,
    });

    const savedManual = await manual.save();

    res.status(201).json(savedManual);
  } catch (error) {
    console.error("CREATE MANUAL ERROR:", error);
    next(error);
  }
};

/* =========================
   ADMIN: Get All Manuals
========================= */
const getAllManualsAdmin = async (req, res) => {
  try {
    const manuals = await Manual.find()
      .populate("category", "name slug")
      .sort({ createdAt: -1 });
    res.json(manuals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   ADMIN: Update Manual
========================= */
const updateManual = async (req, res, next) => {
  try {
    console.log("CATEGORY RECEIVED:", req.body.category);
    const updated = await Manual.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("category", "name slug");

    if (!updated) {
      return res.status(404).json({ message: "Manual not found" });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

/* =========================
   ADMIN: Delete Manual
========================= */
const deleteManual = async (req, res) => {
  try {
    await Manual.findByIdAndDelete(req.params.id);
    res.json({ message: "Manual deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   PUBLIC: Get Published Manuals
========================= */
const getPublishedManuals = async (req, res) => {
  try {
    const manuals = await Manual.find({ isPublished: true })
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    res.json(manuals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   PUBLIC: Get Single Manual
========================= */
const getSingleManual = async (req, res) => {
  try {
    const manual = await Manual.findOne({
      slug: req.params.slug,
      isPublished: true,
    }).populate("category", "name slug");

    if (!manual) {
      return res.status(404).json({ message: "Manual not found" });
    }

    res.json(manual);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createManual,
  getAllManualsAdmin,
  updateManual,
  deleteManual,
  getPublishedManuals,
  getSingleManual,
};
