import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type pair = {
  id: string;
  value: string;
};

interface projectType {
  projectid: string;
  description: string;
  title: string;
  domains: pair[];
  students: pair[];
  guide: pair;
  reviewers: pair[];
}

function ShowGuideProjects() {
  const [reviewerProjects, setReviewerProjects] = useState<projectType[]>([]);
  const [guideProjects, setGuideProjects] = useState<projectType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    axios
      .get("/api/v1/teachers/assignedprojects", { headers })
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          const res1 = response.data?.ReviewerArray;
          const res2 = response.data?.GuideArray;

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
                };
                students: [
                  { _id: string; firstname: string; lastname: string }
                ];
                reviewer: [
                  {
                    _id: string;
                    firstname: string;
                    lastname: string;
                    salutation: string;
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
                  },
                  students: project?.students?.map((student) => {
                    return {
                      id: student._id,
                      value: `${student.firstname} ${student.lastname}`,
                    };
                  }),
                  reviewers: project?.reviewer?.map((reviewer) => {
                    return {
                      id: reviewer._id,
                      value: `${reviewer.salutation} ${reviewer.firstname} ${reviewer.lastname}`,
                    };
                  }),
                };
              }
            );

            setReviewerProjects(reviewprojects);
          }

          if (res2?.length > 0) {
            const guideprojects = res2?.map(
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
                };
                students: [
                  { _id: string; firstname: string; lastname: string }
                ];
                reviewer: [
                  {
                    _id: string;
                    firstname: string;
                    lastname: string;
                    salutation: string;
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
                  },
                  students: project?.students?.map((student) => {
                    return {
                      id: student._id,
                      value: `${student.firstname} ${student.lastname}`,
                    };
                  }),
                  reviewers: project?.reviewer?.map((reviewer) => {
                    return {
                      id: reviewer._id,
                      value: `${reviewer.salutation} ${reviewer.firstname} ${reviewer.lastname}`,
                    };
                  }),
                };
              }
            );

            setGuideProjects(guideprojects);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleViewProject = (id: string) => {
    console.log(id);
    navigate(`/projectdetails/${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl capitalize font-semibold">All Projects</h1>
      <Separator className="my-4 bg-black" />
      <section>
        <div className="my-8">
          <h1 className="text-lg underline capitalize font-semibold">
            Projects in which you are guide
          </h1>
        </div>

        <div>
          {guideProjects?.length > 0 ? (
            <>
              {guideProjects?.map((project: projectType) => {
                return (
                  <Card className="w-full bg-blue-200" key={project.projectid}>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>

                    <CardFooter className="flex justify-between">
                      <Button
                        onClick={() => handleViewProject(project.projectid)}
                      >
                        view project
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </>
          ) : (
            <>
              <div>
                <h4>No projects found where you are guide.</h4>
              </div>
            </>
          )}
        </div>
      </section>
      <section>
        <div className="my-8">
          <h1 className="text-lg underline capitalize font-semibold">
            Projects in which you are reviewer
          </h1>
        </div>

        <div>
          {reviewerProjects?.length > 0 ? (
            <>
              {reviewerProjects?.map((project: projectType) => {
                return (
                  <Card
                    className="max-w-[300px] bg-blue-200"
                    key={project.projectid}
                  >
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>

                    <CardFooter className="flex justify-between">
                      <Button
                        onClick={() => handleViewProject(project.projectid)}
                      >
                        view project
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </>
          ) : (
            <>
              <div>
                <h4>No projects found where you can review.</h4>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default ShowGuideProjects;
