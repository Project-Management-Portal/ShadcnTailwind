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
import { CheckIcon, Loader2 } from "lucide-react";
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

function ShowTeacherProfile() {
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
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [resDomains, setResDomains] = useState([]);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    axios
      .get("/api/v1/auth/profile", { headers })
      .then((response) => {
        // console.log(response.data.teacher);

        if (response.status === 200) {
          const salutation = response.data?.teacher.salutation;
          const firstName = response.data?.teacher.firstname;
          const lastName = response.data?.teacher.lastname;
          const regid = response.data?.teacher.regid;
          const contact = response.data?.teacher.contact;
          const department = response.data?.teacher.dept;
          const domains = response.data?.teacher.domains.map(
            (domain: { _id: string; name: string }) => {
              return {
                value: domain._id,
                label: domain.name,
              };
            }
          );
          const email = response.data?.teacher?.user?.email;

          setSalution(salutation);
          setFirstName(firstName);
          setLastName(lastName);
          setRegId(regid);
          setContact(contact);
          setDepartment(department);
          setEmail(email);
          setResDomains(domains);
          setSelectedDomains(domains);
        }
      })
      .catch((err) => {
        console.log(err);
      });

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

  const handleUpdate = (e: MouseEvent) => {
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
      Notify("error", "To update profile select domains again");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    const data = {
      salutation: salutation,
      firstname: firstName,
      lastname: lastName,
      regid: regid,
      contact: contact,
      dept: department,
      domains: selectedDomains.map((domain: { value: string }) => domain.value),
    };
    console.log(data);

    axios
      .patch("/api/v1/auth/updateprofile", data, { headers })
      .then((response) => {
        if (response.status === 200) {
          Notify("success", "Profile updated successfully");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        Notify("error", "Server error");
      });
  };

  return (
    <div className="">
      <div className="container mx-auto h-full w-full px-4 py-4">
        <h1 className="text-2xl capitalize font-semibold text-blue-600">
          Profile
        </h1>
        <Separator className="my-4 bg-black" />
        <div className="px-4 py-8">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Registered Email</Label>
                <Input
                  type="text"
                  id="email"
                  disabled={true}
                  defaultValue={email}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contact">Salutation</Label>
                <Select
                  onValueChange={(val) => setSalution(val)}
                  disabled={isDisabled}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder={salutation} />
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
                  defaultValue={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  type="text"
                  id="lastname"
                  defaultValue={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isDisabled}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="regid">Registration id</Label>
                <Input
                  type="text"
                  id="regid"
                  defaultValue={regid}
                  onChange={(e) => setRegId(e.target.value)}
                  disabled={isDisabled}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contact">Contact no.</Label>
                <Input
                  type="text"
                  id="contact"
                  defaultValue={contact}
                  onChange={(e) => setContact(e.target.value)}
                  disabled={isDisabled}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contact">Department</Label>
                <Select
                  onValueChange={(val) => setDepartment(val)}
                  disabled={isDisabled}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder={department} />
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

              {
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="domains">Selected Domains</Label>
                  <div>
                    {resDomains.map(
                      (domain: { label: string; value: string }) => (
                        <div
                          className="flex items-center space-x-1.5"
                          key={domain.value}
                        >
                          <div className="flex items-center space-x-1.5">
                            <CheckIcon className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{domain.label}</span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              }
              {!isDisabled && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="domains">Change Domains</Label>
                  <DropdownComponent
                    placeholder="Select domains"
                    isMultiSelect={true}
                    isEditable={true}
                    dropdownOptions={domains}
                    handleChange={setSelectedDomains}
                  />
                </div>
              )}
            </div>
          </form>
          <div className="flex gap-4 mt-4">
            {isDisabled && (
              <Button onClick={() => setIsDisabled(!isDisabled)}>
                Edit Profile
              </Button>
            )}
            {!isDisabled && (
              <>
                <Button className="bg-green-500" onClick={handleUpdate}>
                  Update
                </Button>
                <Button
                  onClick={() => setIsDisabled(!isDisabled)}
                  className="bg-red-500"
                >
                  Cancel Update
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowTeacherProfile;
