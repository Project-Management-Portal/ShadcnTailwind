import Sidebar from "@/components/custom/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <>
      <div className="flex relative">
        <div className="w-[350px] transition-all">
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="container mx-auto bg-white p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
