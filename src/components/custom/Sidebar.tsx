import {
  Bell,
  Loader2,
  Power,
  Presentation,
  User,
  User2,
  Users,
  UsersRoundIcon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import clearLocalStorage from "@/helpers/ClearLocalStorage";
import Notify from "@/helpers/Notify";
import SidebarTab from "./SidebarTab";

interface User {
  _id: string;
  isProfileCreated: boolean;
  email: string;
  role: string;
  password: string;
}

function Sidebar() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const d = localStorage.getItem("user");
  let user: User | null = null;
  if (d) {
    user = JSON.parse(d);
  }

  const [isApprovedByAdmin, setIsApprovedByAdmin] = useState(false);

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    setIsLoading(true);
    axios
      .post(
        "/api/v1/users/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            auth_token: localStorage.getItem("auth_token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          clearLocalStorage();
          Notify("success", "Logout successfully completed");
          navigate("/");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        Notify("error", error.response.data.message);
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token") || "",
    };
    if (user?.role === "Students") {
      axios
        .get(
          "/api/v1/teams/myteam",

          { headers }
        )
        .then((response) => {
          if (response.data?.team[0].assignedGuide?.length > 0) {
            setIsApprovedByAdmin(true);
          } else {
            setIsApprovedByAdmin(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <div className="w-[250px] bg-white h-screen flex flex-col items-center  px-2 py-4 border-r-gray-400 border-2 z-50">
        <NavLink
          to={"/"}
          className="text-3xl font-bold tracking-widest text-blue-700"
        >
          TaskSync
        </NavLink>
        <div className="flex flex-col w-full px-4 gap-4 mt-6">
          <SidebarTab
            link="/allnotices"
            icon={<Bell className="h-5 w-5" />}
            value="Notices"
          />

          {user?.role === "Student" && (
            <SidebarTab
              link="/createteam"
              icon={<Users className="h-5 w-5" />}
              value="Team"
            />
          )}

          {user?.role === "Student" && isApprovedByAdmin && (
            <SidebarTab
              link="/project"
              icon={<Presentation className="h-5 w-5" />}
              value="My Project"
            />
          )}

          {user?.role === "Student" && (
            <SidebarTab
              link="/studentprofile"
              icon={<User2 className="h-5 w-5" />}
              value="Profile"
            />
          )}

          {user?.role === "Teacher" && (
            <SidebarTab
              link="/guideprojects"
              icon={<Users className="h-5 w-5" />}
              value="Show Projects"
            />
          )}

          {user?.role === "Teacher" && (
            <SidebarTab
              link="/teacherprofile"
              icon={<User2 className="h-5 w-5" />}
              value="Profile"
            />
          )}

          {user?.role === "Admin" && (
            <SidebarTab
              link="/createnotice"
              icon={<Users className="h-5 w-5" />}
              value="Create Notice"
            />
          )}

          {user?.role === "Admin" && (
            <SidebarTab
              link="/showteams"
              icon={<UsersRoundIcon className="h-5 w-5" />}
              value="All Teams"
            />
          )}
        </div>
        <Button
          disabled={isLoading}
          onClick={handleSubmit}
          className="w-full mt-8"
          size={"sm"}
        >
          {isLoading ? (
            <Loader2 className="mr-2 w-4 h-4" />
          ) : (
            <Power className="mr-2 w-4 h-4" />
          )}
          Logout
        </Button>
      </div>
    </>
  );
}

export default Sidebar;
