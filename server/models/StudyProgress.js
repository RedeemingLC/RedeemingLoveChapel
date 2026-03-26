import mongoose from "mongoose";

const studyProgressSchema = new mongoose.Schema(
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
    completedDays: {
      type: [Number],
      default: [],
    },
    lastDayRead: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

// A user can only have one progress doc per study
studyProgressSchema.index({ user: 1, study: 1 }, { unique: true });

export default mongoose.model("StudyProgress", studyProgressSchema);
