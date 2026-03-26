import StudyNote from "../models/StudyNote.js";

// Get note for a specific day
export const getNote = async (req, res) => {
  const { studyId, dayNumber } = req.params;

  const note = await StudyNote.findOne({
    user: req.user._id,
    study: studyId,
    dayNumber,
  });

  res.json(note || { content: "" });
};

// Create or update note
export const saveNote = async (req, res) => {
  const { studyId, dayNumber } = req.params;
  const { content } = req.body;

  const note = await StudyNote.findOneAndUpdate(
    { user: req.user._id, study: studyId, dayNumber },
    { content },
    { upsert: true, new: true },
  );

  res.json(note);
};
