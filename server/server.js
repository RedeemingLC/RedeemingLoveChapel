import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import studyRoutes from "./routes/studyRoutes.js";
// import studyDayRoutes from "./routes/studyDayRoutes.js";
import publicStudyRoutes from "./routes/publicStudyRoutes.js";
import studyProgressRoutes from "./routes/studyProgressRoutes.js";
import studyNoteRoutes from "./routes/studyNoteRoutes.js";
import audioRoutes from "./routes/audioRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import manualRoutes from "./routes/manualRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import errorHandler from "./middleware/errorHandler.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import sectionRoutes from "./routes/sectionRoutes.js";
import subsectionRoutes from "./routes/subsectionRoutes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/studies", studyRoutes);
// app.use("/api/studies", studyDayRoutes);
app.use("/api/public/studies", publicStudyRoutes);
app.use("/api/progress", studyProgressRoutes);
app.use("/api/notes", studyNoteRoutes);
app.use("/api/audio", audioRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/manuals", manualRoutes);
app.use("/api/upload", uploadRoutes);
// app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/categories", categoryRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/subsections", subsectionRoutes);

// Error Handling
app.use(errorHandler);

// Health route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
