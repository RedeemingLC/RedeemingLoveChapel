import mongoose from "mongoose";

const studyNoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    study: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Study",
      required: true,
    },
    dayNumber: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

// A user can only have ONE note per study day
studyNoteSchema.index({ user: 1, study: 1, dayNumber: 1 }, { unique: true });

export default mongoose.model("StudyNote", studyNoteSchema);
