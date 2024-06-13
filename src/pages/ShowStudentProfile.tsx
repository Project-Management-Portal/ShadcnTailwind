import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Notify from "@/helpers/Notify";
import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface studentType {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  dept: string;
  regid: string;
  class: string;
  rollno: string;
}

function ShowStudentProfile() {
  const [user, setUser] = useState<studentType>({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    dept: "",
    regid: "",
    class: "",
    rollno: "",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regid, setRegId] = useState("");
  const [contact, setContact] = useState("");
  const [department, setDepartment] = useState("");
  const [classId, setClassId] = useState("");
  const [rollno, setRollno] = useState("");
  const [email, setEmail] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token") || "",
    };

    axios
      .get("/api/v1/students", { headers })
      .then((response) => {
        // console.log(response.data.student);
        console.log(response);
        if (response.status === 200) {
          const student = response.data?.student;
          const id = student._id;
          const dept = student.dept;
          const firstname = student.firstName;
          const lastname = student.lastName;
          const email = student?.userId?.email;
          const contact = student.contact;
          const regid = student.regId;
          const classs = student?.details?.class;
          const rollno = student?.details?.rollNo;

          setUser({
            id,
            firstname,
            lastname,
            email,
            contact,
            dept,
            regid,
            class: classs,
            rollno,
          });

          setFirstName(firstname);
          setLastName(lastname);
          setRegId(regid);
          setContact(contact);
          setDepartment(dept);
          setClassId(classs);
          setRollno(rollno);
          setEmail(email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdate = (e: MouseEvent) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

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

    const data = {
      firstName: firstName,
      lastName: lastName,
      regId: regid,
      contact: contact,
      dept: department,
      details: {
        class: classId,
        rollNo: rollno,
      },
    };

    axios
      .put("/api/v1/students", data, { headers })
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
    <div>
      <h1 className="text-2xl capitalize font-semibold">Profile</h1>
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
              <Label htmlFor="firstname">First name</Label>
              <Input
                type="text"
                id="firstname"
                disabled={isDisabled}
                defaultValue={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastname">Last name</Label>
              <Input
                type="text"
                id="lastname"
                disabled={isDisabled}
                defaultValue={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="regid">Registration id</Label>
              <Input
                type="text"
                id="regid"
                disabled={isDisabled}
                defaultValue={regid}
                onChange={(e) => setRegId(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="contact">Contact no.</Label>
              <Input
                type="text"
                id="contact"
                disabled={isDisabled}
                defaultValue={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="department">Department</Label>
              <Select
                onValueChange={(val) => setDepartment(val)}
                disabled={isDisabled}
              >
                <SelectTrigger id="department">
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="class">Class</Label>
              <Select
                onValueChange={(val) => setClassId(val)}
                disabled={isDisabled}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder={classId} />
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
                disabled={isDisabled}
                defaultValue={rollno}
                onChange={(e) => setRollno(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1.5"></div>
          </div>
        </form>
        <div className="flex gap-4">
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
  );
}

export default ShowStudentProfile;
