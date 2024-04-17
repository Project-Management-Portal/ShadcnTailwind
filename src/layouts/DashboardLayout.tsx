import Sidebar from "@/components/custom/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <>
      <div className="flex relative">
        <div className="fixed left-0 top-0">
          <Sidebar />
        </div>
        <div className="w-full ml-[300px]">
          <div className="container mx-auto bg-white p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
