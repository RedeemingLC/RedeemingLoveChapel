"use strict";

const Audio = require("../models/Audio");

/* =============================
   ADMIN: Create Audio
============================= */
const createAudio = async (req, res) => {
  try {
    const audio = await Audio.create(req.body);
    res.status(201).json(audio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =============================
   ADMIN: Get All Audio (Admin View)
============================= */
const getAllAudioAdmin = async (req, res) => {
  try {
    const audio = await Audio.find().sort({ createdAt: -1 });
    res.json(audio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =============================
   ADMIN: Update Audio
============================= */
const updateAudio = async (req, res) => {
  try {
    const audio = await Audio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(audio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =============================
   ADMIN: Delete Audio
============================= */
const deleteAudio = async (req, res) => {
  try {
    await Audio.findByIdAndDelete(req.params.id);
    res.json({ message: "Audio deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =============================
   PUBLIC: Get Published Audio
============================= */
const getPublishedAudio = async (req, res) => {
  try {
    const audio = await Audio.find({ isPublished: true }).sort({
      createdAt: -1,
    });
    res.json(audio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAudio,
  getAllAudioAdmin,
  updateAudio,
  deleteAudio,
  getPublishedAudio,
};
