import Audio from "../models/Audio.js";

/* =============================
   ADMIN: Create Audio
============================= */
export const createAudio = async (req, res) => {
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
export const getAllAudioAdmin = async (req, res) => {
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
export const updateAudio = async (req, res) => {
  try {
    const audio = await Audio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(audio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =============================
   ADMIN: Delete Audio
============================= */
export const deleteAudio = async (req, res) => {
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
export const getPublishedAudio = async (req, res) => {
  try {
    const audio = await Audio.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json(audio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
