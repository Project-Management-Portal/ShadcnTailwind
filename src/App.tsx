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
          <Route path="/project" element={<Project />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
