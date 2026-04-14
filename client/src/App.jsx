import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";

import AdminLayout from "./admin/layout/AdminLayout";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Live from "./Pages/Live/Live";
import Manuals from "./Pages/Manuals/Manuals";
import AudioSermons from "./Pages/AudioSermons/AudioSermons";
import Blog from "./Pages/Blog/Blog";
import WorshipCenters from "./Pages/WorshipCenters/WorshipCenters";
import Evangelism from "./Pages/Evangelism/Evangelism";
import HomeChurch from "./Pages/HomeChurch/HomeChurch";
import LafOutreach from "./Pages/LAF/LafOutreach";

import AdminOverview from "./admin/pages/AdminOverview";
import AdminManuals from "./admin/pages/AdminManuals";
import AdminAudioSermons from "./admin/pages/AdminAudioSermons";
import AdminBlog from "./admin/pages/AdminBlog";
import AdminLogin from "./admin/pages/AdminLogin";

import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import VerifyEmail from "./Pages/Auth/VerifyEmail";
import ResetPassword from "./Pages/Auth/ResetPassword";
import StudyDashboard from "./Pages/study/StudyDashboard";

import AdminStudyEditor from "./admin/pages/studies/AdminStudyEditor";
import AdminStudies from "./admin/pages/studies/AdminStudies";

import StudyEntryPage from "./Pages/study/StudyEntryPage";
import StudyDayReader from "./Pages/study/StudyDayReader";
import StudyCompletion from "./Pages/study/StudyCompletion";
import StudyOverview from "./Pages/study/StudyOverview";
import CategoryManager from "./admin/pages/CategoryManager";
import WisdomManager from "./admin/WisdomManager/WisdomManager";
import SectionManager from "./admin/SectionManager/SectionManager";
import SubsectionManager from "./admin/SubsectionManager/SubsectionManager";
import ScrollToTop from "./components/Common/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/live" element={<Live />} />
          <Route path="/manuals" element={<Manuals />} />
          <Route path="/manuals/:slug" element={<Manuals />} />
          <Route path="/audio" element={<AudioSermons />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/worship-centers" element={<WorshipCenters />} />
          <Route path="/evangelism" element={<Evangelism />} />
          <Route path="/home-church" element={<HomeChurch />} />
          <Route path="/lafoutreach" element={<LafOutreach />} />
          <Route path="/centers" element={<WorshipCenters />} />

          {/* Study Section */}
          <Route path="/study/:slug/completion" element={<StudyCompletion />} />
          <Route path="/study/:slug/overview" element={<StudyOverview />} />
          <Route
            path="/study/:slug/day/:dayNumber"
            element={<StudyDayReader />}
          />
          <Route path="/study/:slug" element={<StudyEntryPage />} />

          {/* 🔐 User Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/my-studies" element={<StudyDashboard />} />
        </Route>

        {/* Admin login (public) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin routes (protected) */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="wisdom" element={<WisdomManager />} />
            <Route path="manuals" element={<AdminManuals />} />
            <Route path="audio-sermons" element={<AdminAudioSermons />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route
              path="manuals/:manualId/sections"
              element={<SectionManager />}
            />
            <Route
              path="sections/:sectionId/lessons"
              element={<SubsectionManager />}
            />

            {/* ✅ Fix these: relative paths */}
            <Route path="studies" element={<AdminStudies />} />
            <Route path="studies/:studyId" element={<AdminStudyEditor />} />
            <Route path="/admin/categories" element={<CategoryManager />} />
            {/* <Route path="/admin/content" element={<ContentManager />} />
          <Route
            path="/admin/content/:contentId/sections"
            element={<SectionManager />}
          />
          <Route
            path="/admin/sections/:sectionId/subsections"
            element={<SubsectionManager />}
          /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
