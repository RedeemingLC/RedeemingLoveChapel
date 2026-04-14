"use strict";

const WordOfWisdom = require("../models/WordOfWisdom");

/* =========================================
   GET Active Wisdom (Public)
========================================= */
const getActiveWisdom = async (req, res) => {
  try {
    const wisdom = await WordOfWisdom.findOne({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    // Fallback if none exists
    if (!wisdom) {
      return res.json({
        text: "Stay faithful in the little things.",
        author: "Unknown",
      });
    }

    res.json(wisdom);
  } catch (error) {
    console.error("getActiveWisdom error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================
   DEACTIVATE Wisdom
========================================= */
const deactivateWisdom = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await WordOfWisdom.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    res.json(updated);
  } catch (error) {
    console.error("deactivateWisdom error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================
   GET All Wisdom (Admin)
========================================= */
const getAllWisdom = async (req, res) => {
  try {
    const wisdom = await WordOfWisdom.find().sort({ createdAt: -1 });
    res.json(wisdom);
  } catch (error) {
    console.error("getAllWisdom error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================
   CREATE Wisdom
========================================= */
const createWisdom = async (req, res) => {
  try {
    const { text, author } = req.body;

    const wisdom = await WordOfWisdom.create({
      text,
      author,
    });

    res.status(201).json(wisdom);
  } catch (error) {
    console.error("createWisdom error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================
   UPDATE Wisdom
========================================= */
const updateWisdom = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await WordOfWisdom.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    console.error("updateWisdom error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================
   DELETE Wisdom
========================================= */
const deleteWisdom = async (req, res) => {
  try {
    await WordOfWisdom.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("deleteWisdom error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================
   SET ACTIVE Wisdom
========================================= */
const setActiveWisdom = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 Step 1: Deactivate ALL wisdom
    await WordOfWisdom.updateMany({ isActive: true }, { isActive: false });

    // 🔥 Step 2: Activate selected one
    const updated = await WordOfWisdom.findByIdAndUpdate(
      id,
      {
        isActive: true,
        lastActivatedAt: new Date(),
      },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Wisdom not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("setActiveWisdom error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getActiveWisdom,
  deactivateWisdom,
  getAllWisdom,
  createWisdom,
  updateWisdom,
  deleteWisdom,
  setActiveWisdom,
};
