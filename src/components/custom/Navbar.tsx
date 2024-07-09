import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useState, MouseEvent } from "react";
import { AlignJustify, Loader2 } from "lucide-react";
import axios from "axios";
import Notify from "@/helpers/Notify";
import clearLocalStorage from "@/helpers/ClearLocalStorage";

interface User {
  _id: string;
  isProfileCreated: boolean;
  email: string;
  role: string;
  password: string;
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");
  const d = localStorage.getItem("user");
  let user: User | null = null;
  if (d) {
    user = JSON.parse(d);
  }

  const [isLoading, setIsLoading] = useState(false);
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
          Notify("success", "Logout successfully completed");
          clearLocalStorage();
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

  const toggleNav = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="">
        <nav className="container  mx-auto flex items-center justify-between py-4">
          <NavLink
            to={"/"}
            className="text-4xl font-bold tracking-widest text-blue-700"
          >
            TaskSync
          </NavLink>
          <ul className="hidden lg:flex items-center justify-between gap-8 ">
            <li className="text-lg font-medium hover:text-blue-600 hover:underline">
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li className="text-lg font-medium hover:text-blue-600 hover:underline">
              <NavLink to={"/"}>About</NavLink>
            </li>
            <li className="text-lg font-medium hover:text-blue-600 hover:underline">
              <NavLink to={"/"}>Contact</NavLink>
            </li>
          </ul>
          <div className="hidden lg:flex items-center space-x-4">
            {!token ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-gray-300"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                {user?.isProfileCreated ? (
                  <Button
                    size="sm"
                    className="bg-blue-600"
                    onClick={() => navigate("/allnotices")}
                  >
                    Dashboard
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="bg-blue-600"
                    onClick={() => navigate("/createstudentprofile")}
                  >
                    Create Profile
                  </Button>
                )}
                <Button size="sm" disabled={isLoading} onClick={handleSubmit}>
                  {isLoading && <Loader2 className="mr-2 w-4 h-4" />}
                  Logout
                </Button>
              </>
            )}
          </div>
          <div
            className="bloack lg:hidden p-1 hover:bg-gray-200 cursor-pointer"
            onClick={toggleNav}
          >
            <AlignJustify className="text-black" />
          </div>
        </nav>
        <div
          className={`container ${isOpen ? "block" : "hidden"} transition-all`}
        >
          <div className="flex flex-col gap-4">
            <ul className="">
              <ul className="flex flex-col items-start justify-between gap-6">
                <li className="text-lg font-medium hover:text-blue-600 hover:underline">
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li className="text-lg font-medium hover:text-blue-600 hover:underline">
                  <NavLink to={"/"}>About</NavLink>
                </li>
                <li className="text-lg font-medium hover:text-blue-600 hover:underline">
                  <NavLink to={"/"}>Contact</NavLink>
                </li>
              </ul>
            </ul>
            <div className="flex items-center space-x-4">
              {!token ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-gray-300"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                  <Button
                    size="sm"
                    className="bg-blue-600"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    className="bg-blue-600"
                    onClick={() => navigate("/allnotices")}
                  >
                    Dashboard
                  </Button>
                  <Button size="sm" disabled={isLoading} onClick={handleSubmit}>
                    {isLoading && <Loader2 className="mr-2 w-4 h-4" />}
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
