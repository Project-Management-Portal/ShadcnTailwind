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
import { MouseEvent, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DropdownComponent from "@/components/custom/DropdownComponent";

const departmentOptions = [
  { id: 1, value: "IT", label: "IT" },
  { id: 2, value: "ENTC", label: "ENTC" },
  { id: 3, value: "CSE", label: "CSE" },
];

const salutations = [
  { id: 1, value: "Mr.", label: "Mr." },
  { id: 2, value: "Mrs.", label: "Mrs." },
  { id: 3, value: "Ms.", label: "Ms." },
  { id: 4, value: "Dr.", label: "Dr." },
];

interface Option {
  value: string;
  label: string;
}

function TeacherProfile() {
  const [salutation, setSalution] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regid, setRegId] = useState("");
  const [contact, setContact] = useState("");
  const [department, setDepartment] = useState("");
  const [domains, setDomains] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState<Option[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get("/api/v1/domains")
      .then((res) => {
        const allDomains = res.data.map(
          (domain: { _id: string; name: string }) => {
            return {
              value: domain._id,
              label: domain.name,
            };
          }
        );
        setDomains(allDomains);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    if (!salutation) {
      Notify("error", "Please select a salutation");
      return;
    }

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
    if (selectedDomains.length < 1) {
      Notify("error", "Please select atleast one domain");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    const data = {
      salutation: salutation,
      firstName: firstName,
      lastName: lastName,
      regId: regid,
      contact: contact,
      department: department,
      domains: selectedDomains.map((domain: { value: string }) => domain.value),
    };
    console.log(data);

    setIsLoading(true);

    axios
      .post("/api/v1/teachers", data, { headers })
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
                <Label htmlFor="contact">Salutation</Label>
                <Select onValueChange={(val) => setSalution(val)}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select your salutation" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {salutations.map((option) => (
                      <SelectItem key={option.id} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                <Label htmlFor="domains">Domains</Label>
                <DropdownComponent
                  placeholder="Select domains"
                  isMultiSelect={true}
                  isEditable={true}
                  dropdownOptions={domains}
                  handleChange={setSelectedDomains}
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

export default TeacherProfile;
