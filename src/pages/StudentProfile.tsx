import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Notify from "@/helpers/Notify";
import axios from "axios";
import { MouseEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const departmentOptions = [
  { id: 1, value: "IT", label: "IT" },
  { id: 2, value: "ENTC", label: "ENTC" },
  { id: 3, value: "CSE", label: "CSE" },
];

const classOptions = [
  { id: 1, value: "BE-1", label: "BE-1" },
  { id: 2, value: "BE-2", label: "BE-2" },
  { id: 3, value: "BE-3", label: "BE-3" },
  { id: 4, value: "BE-4", label: "BE-4" },
  { id: 5, value: "BE-5", label: "BE-5" },
  { id: 6, value: "BE-6", label: "BE-6" },
  { id: 7, value: "BE-7", label: "BE-7" },
  { id: 8, value: "BE-8", label: "BE-8" },
  { id: 9, value: "BE-9", label: "BE-9" },
  { id: 10, value: "BE-10", label: "BE-10" },
  { id: 11, value: "BE-11", label: "BE-11" },
];

function StudentProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regid, setRegId] = useState("");
  const [contact, setContact] = useState("");
  const [department, setDepartment] = useState("");
  const [classId, setClassId] = useState("");
  const [rollno, setRollno] = useState("");
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    if (!firstName) {
      Notify("error", "Please enter a first name");
      return;
    }
    if (!lastName) {
      Notify("error", "Please enter a last name");
      return;
    }
    if (!regid) {
      Notify("error", "Please enter a regid");
      return;
    }
    if (!contact) {
      Notify("error", "Please enter a contact");
      return;
    }
    if (contact.length > 10 || contact.length < 10) {
      Notify("error", "Please enter a valid contact");
      return;
    }
    if (!department) {
      Notify("error", "Please select a department");
      return;
    }
    if (!classId) {
      Notify("error", "Please select a class");
      return;
    }
    if (!rollno) {
      Notify("error", "Please enter a rollno");
      return;
    }
    if (rollno.length > 5 || rollno.length < 5) {
      Notify("error", "Please enter a valid rollno");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    const data = {
      firstname: firstName,
      lastname: lastName,
      regid: regid,
      contact: contact,
      dept: department,
      details: {
        class: classId,
        rollno: rollno,
      },
    };

    setIsLoading(true);
    axios
      .post("/api/v1/auth/createprofile", data, { headers })
      .then((response) => {
        if (response.status === 201) {
          localStorage.setItem("isProfileCreated", JSON.stringify(true));
          Notify("success", "Profile Created Successfully");
          navigate("/allnotices");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        Notify("error", err.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-blue-50">
      <div className="container mx-auto h-full w-full px-4 py-4">
        <h1 className="text-2xl capitalize font-semibold text-blue-600">
          To use the platform, first create your profile.
        </h1>
        <Separator className="my-4 bg-black" />
        <div className="px-4 py-8">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="firstname">First name</Label>
                <Input
                  type="text"
                  id="firstname"
                  placeholder="eg. Rishikesh"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  type="text"
                  id="lastname"
                  placeholder="eg. Revandikar"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="regid">Registration id</Label>
                <Input
                  type="text"
                  id="regid"
                  placeholder="eg. I2K21106756"
                  onChange={(e) => setRegId(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contact">Contact no.</Label>
                <Input
                  type="text"
                  id="contact"
                  placeholder="eg. 8288055574"
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contact">Department</Label>
                <Select onValueChange={(val) => setDepartment(val)}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {departmentOptions.map((option) => (
                      <SelectItem key={option.id} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contact">Class</Label>
                <Select onValueChange={(val) => setClassId(val)}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select your class" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {classOptions.map((option) => (
                      <SelectItem key={option.id} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="rollno">Roll no.</Label>
                <Input
                  type="text"
                  id="rollno"
                  placeholder="eg. 44164"
                  onChange={(e) => setRollno(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
