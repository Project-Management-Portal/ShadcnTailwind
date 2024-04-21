import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    axios
      .get("/api/v1/auth/profile", { headers })
      .then((response) => {
        // console.log(response.data.student);

        if (response.status === 200) {
          const student = response.data?.student;
          const id = student._id;
          const dept = student.dept;
          const firstname = student.firstname;
          const lastname = student.lastname;
          const email = student?.user?.email;
          const contact = student.contact;
          const regid = student.regid;
          const classs = student?.details?.class;
          const rollno = student?.details?.rollno;
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(user);

  return (
    <div>
      <h1 className="text-2xl capitalize font-semibold">Profile</h1>
      <Separator className="my-4 bg-black" />
      <div className="px-4 py-8">
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstname">First name</Label>
              <Input type="text" id="firstname" placeholder="eg. Rishikesh" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastname">Last name</Label>
              <Input type="text" id="lastname" placeholder="eg. Revandikar" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="regid">Registration id</Label>
              <Input type="text" id="regid" placeholder="eg. I2K21106756" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="contact">Contact no.</Label>
              <Input type="text" id="contact" placeholder="eg. 8288055574" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="contact">Department</Label>
              <Input type="text" id="rollno" placeholder="eg. 44164" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="contact">Class</Label>
              <Input type="text" id="rollno" placeholder="eg. 44164" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="rollno">Roll no.</Label>
              <Input type="text" id="rollno" placeholder="eg. 44164" />
            </div>

            <div className="flex flex-col space-y-1.5"></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShowStudentProfile;
