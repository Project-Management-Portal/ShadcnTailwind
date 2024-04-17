import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import AllNotices from "./pages/AllNotices";
import CreateTeam from "./pages/CreateTeam";
import CreateNotice from "./pages/CreateNotice";
import ShowTeams from "./pages/ShowTeams";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<DashboardLayout />}>
          <Route path="/allnotices" element={<AllNotices />} />
          <Route path="/createteam" element={<CreateTeam />} />
          <Route path="/createnotice" element={<CreateNotice />} />
          <Route path="/showteams" element={<ShowTeams />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
