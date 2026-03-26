import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    manual: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manual",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

sectionSchema.index({ manual: 1, order: 1 });

export default mongoose.model("Section", sectionSchema);
