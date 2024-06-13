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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Notify from "@/helpers/Notify";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { MouseEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const providesOptions: { id: number; value: string; label: string }[] = [
  { id: 1, value: "Student", label: "Student" },
  { id: 2, value: "HOD", label: "HOD" },
  { id: 3, value: "Teacher", label: "Teacher" },
];

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (!email) {
      Notify("error", "Please enter an email");
      return;
    }

    if (!password) {
      Notify("error", "Please enter a password");
      return;
    }

    if (!confirmPassword) {
      Notify("error", "Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      Notify("error", "Passwords do not match");
      return;
    }

    if (!role) {
      Notify("error", "Please select a role");
      return;
    }

    const data = {
      email: email,
      password: password,
      role: role,
    };

    console.log(data);
    setIsLoading(true);
    axios
      .post("/api/v1/auth/register", data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          console.log(response.status);
          console.log(response.data.auth_token);
          console.log(response.data.user);
          localStorage.setItem("auth_token", response.data.auth_token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          Notify("success", "Registration Successful");
          if (response.data.user.role === "Students") {
            navigate("/createstudentprofile");
          } else {
            navigate("/createteacherprofile");
          }
        }
        if (response.status === 400) {
          Notify("error", "Registration Failed");
        }

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        Notify("error", err.response.data.message);
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
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Enter your personal details and start your journey with us
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
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="renterpassword">Renter Password</Label>
                      <Input
                        type="password"
                        id="renterpassword"
                        placeholder="Enter your above password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="role">Role</Label>
                      <Select onValueChange={(val) => setRole(val)}>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {providesOptions.map((option) => (
                            <SelectItem key={option.id} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  disabled={isLoading}
                  onClick={(e) => handleSubmit(e)}
                  className="w-full"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  )}
                  Register
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        <section>
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-4 mt-2">
            <h1 className="font-semibold">Alreacy have an account!</h1>
            <NavLink
              to={"/login"}
              className={"text-blue-600 font-semibold underline"}
            >
              Login
            </NavLink>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Register;
