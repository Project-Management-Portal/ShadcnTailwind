import Sidebar from "@/components/custom/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <>
      <div className="flex relative">
        <div className="fixed top-0 left-0 ">
          <Sidebar />
        </div>
        <div className="w-full ml-[250px]">
          <div className="container mx-auto bg-white p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
