import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Notify from "@/helpers/Notify";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { MouseEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    if (email === "") {
      Notify("error", "Please enter your email address.");
      return;
    }

    if (password === "") {
      Notify("error", "Password is required");
      return;
    }

    const data = {
      email,
      password,
    };

    setIsLoading(true);
    axios
      .post("/api/v1/users/login", data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("auth_token", response.data.auth_token);
          localStorage.setItem("user", JSON.stringify(response.data.user));

          Notify("success", "Login Successful");
          if (response.data.user.isProfileCreated) {
            navigate("/allnotices");
          } else {
            if (response.data.user.role === "Students") {
              navigate("/createstudentprofile");
            } else {
              navigate("/createteacherprofile");
            }
          }
        }

        if (response.status === 400) {
          Notify("error", "Login Failed");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error", error);
        Notify("error", error.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div>
        <Navbar />
        <section>
          <div className="container mx-auto flex items-center justify-center py-12">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  To keep connected with us please login with your personal info
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Your email address"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="w-full"
                >
                  {isLoading && <Loader2 className="mr-2 w-4 h-4" />}
                  Login
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        <section>
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-4 mt-2">
            <h1 className="font-semibold">Don&apos;t have an account yet!</h1>
            <NavLink
              to={"/register"}
              className={"text-blue-600 font-semibold underline"}
            >
              Register
            </NavLink>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Login;
