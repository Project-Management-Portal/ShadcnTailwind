import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChevronLeft } from "lucide-react";

type pair = {
  id: string;
  value: string;
};

interface projectType {
  projectid: string;
  description: string;
  title: string;
  domains: pair[];
  students: [
    {
      id: string;
      value: string;
      rollno: number;
      class: string;
      dept: string;
    }
  ];
  guide: {
    id: string;
    value: string;
    dept: string;
  };
  reviewers: [
    {
      id: string;
      value: string;
      dept: string;
    }
  ];
}
function ProjectDetails() {
  const { id } = useParams();
  const [projects, setProjects] = useState<projectType[]>([]);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    axios
      .get(`/api/v1/project/getprojectbyid/${id}`, { headers })
      .then((response) => {
        // console.log(response);
        const res1 = response.data?.project;

        // console.log(res1);
        if (res1?.length > 0) {
          const reviewprojects = res1?.map(
            (project: {
              _id: string;
              description: string;
              title: string;
              domains: [{ _id: string; name: string }];
              guide: {
                _id: string;
                firstname: string;
                lastname: string;
                salutation: string;
                dept: string;
              };
              students: [
                {
                  _id: string;
                  firstname: string;
                  lastname: string;
                  details: { class: string; rollno: string };
                  dept: string;
                }
              ];
              reviewer: [
                {
                  _id: string;
                  firstname: string;
                  lastname: string;
                  salutation: string;
                  dept: string;
                }
              ];
            }) => {
              return {
                projectid: project._id,
                description: project?.description,
                title: project?.title,
                domains: project?.domains?.map((domain) => {
                  return {
                    id: domain._id,
                    value: domain.name,
                  };
                }),
                guide: {
                  id: project.guide?._id,
                  value: `${project.guide?.salutation} ${project.guide?.firstname} ${project.guide?.lastname}`,
                  dept: project.guide?.dept,
                },
                students: project?.students?.map((student) => {
                  return {
                    id: student._id,
                    value: `${student.firstname} ${student.lastname}`,
                    rollno: student.details.rollno,
                    class: student.details.class,
                    dept: student.dept,
                  };
                }),
                reviewers: project?.reviewer?.map((reviewer) => {
                  return {
                    id: reviewer._id,
                    value: `${reviewer.salutation} ${reviewer.firstname} ${reviewer.lastname}`,
                    dept: reviewer.dept,
                  };
                }),
              };
            }
          );

          setProjects(reviewprojects);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-2xl capitalize font-semibold">Project Details</h1>
      <Separator className="my-4 bg-black" />
      <div className="">
        <NavLink to="/guideprojects" className="flex items-center mb-2">
          <ChevronLeft className="w-5 h-5 mr-2" />
          <h5 className="text-black text-lg underline">Back to all projects</h5>
        </NavLink>
      </div>
      <div className="pl-4">
        {projects?.length > 0 &&
          projects?.map((project: projectType) => {
            return (
              <Card className="bg-blue-100" key={project.projectid}>
                <CardHeader>
                  <CardTitle className="mb-2">
                    Title :{" "}
                    <span className="text-blue-700">{project.title}</span>
                  </CardTitle>
                  <CardDescription className="mb-2">
                    <span className="text-2xl font-semibold text-black mr-2">
                      Description :
                    </span>
                    <span className="text-blue-700 font-medium">
                      {project.description}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <h4 className="text-2xl font-semibold text-black mb-2">
                      Guide :{" "}
                    </h4>
                    <Table className="bg-white">
                      <TableHeader>
                        <TableRow>
                          <TableCell>Department</TableCell>
                          <TableCell>Name</TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow key={project?.guide.id}>
                          <TableCell>{project?.guide.dept}</TableCell>
                          <TableCell>{project?.guide.value}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold text-black mb-2">
                      Assigned reviewers :{" "}
                    </h4>
                    <Table className="bg-white">
                      <TableHeader>
                        <TableRow>
                          <TableCell>Sr. no.</TableCell>
                          <TableCell>Department</TableCell>
                          <TableCell>Name</TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {project.reviewers?.map((guide, index) => {
                          return (
                            <TableRow key={guide.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{guide.dept}</TableCell>
                              <TableCell>{guide.value}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold text-black mb-2">
                      Team members :{" "}
                    </h4>
                    <Table className="bg-white">
                      <TableHeader>
                        <TableRow>
                          <TableCell>Sr. no.</TableCell>
                          <TableCell>Class</TableCell>
                          <TableCell>Roll no.</TableCell>
                          <TableCell>Department</TableCell>
                          <TableCell>Name</TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {project.students?.map((student, index) => {
                          return (
                            <TableRow key={student.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{student.class}</TableCell>
                              <TableCell>{student.rollno}</TableCell>
                              <TableCell>{student.dept}</TableCell>
                              <TableCell>{student.value}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold text-black mb-2">
                      Domains :{" "}
                    </h4>
                    <Table className="bg-white">
                      <TableHeader>
                        <TableRow>
                          <TableCell>Sr. no.</TableCell>

                          <TableCell className="text-center">
                            Domain name
                          </TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {project.domains?.map((domain, index) => {
                          return (
                            <TableRow key={domain.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell className="text-center">
                                {domain.value}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter>{/* <Button>Create Project</Button> */}</CardFooter>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default ProjectDetails;
