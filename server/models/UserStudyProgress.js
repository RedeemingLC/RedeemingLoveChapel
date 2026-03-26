import mongoose from "mongoose";

const userStudyProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Study",
      required: true,
    },
    completedDays: {
      type: [Number],
      default: [],
    },
    lastCompletedDay: {
      type: Number,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const UserStudyProgress = mongoose.model(
  "UserStudyProgress",
  userStudyProgressSchema,
);

export default UserStudyProgress;
