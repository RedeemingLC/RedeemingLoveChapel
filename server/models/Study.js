import mongoose from "mongoose";

const studySchema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,

  entryTitle: String,
  entrySubtitle: String,
  entryContent: {
    type: String,
    default: "",
  },

  days: [
    {
      dayNumber: Number,
      title: String,
      reflectionPrompt: String,
      hasPauseDivider: Boolean,
      pauseText: String,
      content: String,
    },
  ],

  topic: {
    type: String,
    default: "General",
  },

  isPublished: Boolean,
  coverImage: String,
});

// ✅ CREATE MODEL
const Study = mongoose.model("Study", studySchema);

// ✅ EXPORT DEFAULT (THIS FIXES YOUR ERROR)
export default Study;
