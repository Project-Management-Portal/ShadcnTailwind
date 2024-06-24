import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import AllNotices from "./pages/AllNotices";
import CreateTeam from "./pages/CreateTeam";
import CreateNotice from "./pages/CreateNotice";
import ShowTeams from "./pages/ShowTeams";
import PrivateRoutes from "./routes/PrivateRoutes";
import PageNotFound from "./pages/PageNotFound";
import StudentProfile from "./pages/StudentProfile";
import TeacherProfile from "./pages/TeacherProfile";
import Project from "./pages/Project";
import ShowGuideTeams from "./pages/ShowGuideProjects";
import ProjectDetails from "./pages/ProjectDetails";
import ShowStudentProfile from "./pages/ShowStudentProfile";
import Assessment from "./pages/Assessment";
import ShowTeacherProfile from "./pages/ShowTeacherProfile";
import FirstReview from "./pages/FirstReview";
import Analytics from "./pages/Analytics";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createstudentprofile" element={<StudentProfile />} />
        <Route path="/createteacherprofile" element={<TeacherProfile />} />
        <Route
          element={
            <PrivateRoutes>
              <DashboardLayout />
            </PrivateRoutes>
          }
        >
          <Route path="/allnotices" element={<AllNotices />} />
          <Route path="/createteam" element={<CreateTeam />} />
          <Route path="/createnotice" element={<CreateNotice />} />
          <Route path="/showteams" element={<ShowTeams />} />
          <Route path="/guideprojects" element={<ShowGuideTeams />} />
          <Route path="/project" element={<Project />} />
          <Route path="/projectdetails/:id" element={<ProjectDetails />} />
          <Route path="/assessproject/:id" element={<Assessment />} />
          <Route path="/studentprofile" element={<ShowStudentProfile />} />
          <Route path="/teacherprofile" element={<ShowTeacherProfile />} />
          <Route path="/firstreview/:id" element={<FirstReview />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
