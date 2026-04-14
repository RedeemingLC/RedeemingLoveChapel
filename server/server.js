"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const studyRoutes = require("./routes/studyRoutes");
const publicStudyRoutes = require("./routes/publicStudyRoutes");
const studyProgressRoutes = require("./routes/studyProgressRoutes");
const studyNoteRoutes = require("./routes/studyNoteRoutes");
const audioRoutes = require("./routes/audioRoutes");
const blogRoutes = require("./routes/blogRoutes");
const manualRoutes = require("./routes/manualRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const errorHandler = require("./middleware/errorHandler");
const categoryRoutes = require("./routes/categoryRoutes");
const contentRoutes = require("./routes/contentRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const subsectionRoutes = require("./routes/subsectionRoutes");
const wisdomRoutes = require("./routes/wordOfWisdomRoutes");

const { rotateWisdom } = require("./utils/rotateWisdom");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/studies", studyRoutes);
app.use("/api/public/studies", publicStudyRoutes);
app.use("/api/progress", studyProgressRoutes);
app.use("/api/notes", studyNoteRoutes);
app.use("/api/audio", audioRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/manuals", manualRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/categories", categoryRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/subsections", subsectionRoutes);
app.use("/api/wisdom", wisdomRoutes);

// Every 24 hours (midnight)
cron.schedule("0 0 * * *", () => {
  rotateWisdom();
});

// Error Handling
app.use(errorHandler);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Export app for Truehost/cPanel
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// Export app for Truehost/cPanel
module.exports = app;
