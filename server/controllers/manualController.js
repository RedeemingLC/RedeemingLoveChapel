import slugify from "slugify";
import Manual from "../models/Manual.js";

/* =========================
   ADMIN: Create Manual
========================= */
export const createManual = async (req, res, next) => {
  try {
    const { title, description, content, fileUrl, coverImage } = req.body;

    const manual = new Manual({
      title,
      description,
      content,
      fileUrl,
      coverImage,
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
export const getAllManualsAdmin = async (req, res) => {
  try {
    const manuals = await Manual.find().sort({ createdAt: -1 });
    res.json(manuals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   ADMIN: Update Manual
========================= */
export const updateManual = async (req, res, next) => {
  try {
    const updated = await Manual.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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
export const deleteManual = async (req, res) => {
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
export const getPublishedManuals = async (req, res) => {
  try {
    const manuals = await Manual.find({ isPublished: true }).sort({
      createdAt: -1,
    });

    res.json(manuals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   PUBLIC: Get SIngle Manual
========================= */
export const getSingleManual = async (req, res) => {
  try {
    const manual = await Manual.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!manual) {
      return res.status(404).json({ message: "Manual not found" });
    }

    res.json(manual);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
