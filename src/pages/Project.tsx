import { Separator } from "@/components/ui/separator";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Notify from "@/helpers/Notify";

interface projectType {
  title: string;
  description: string;
}

function Project() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [buttonLoad, setButtonLoad] = useState(false);
  const [isProjectCreated, setIsProjectCreated] = useState(false);
  const [projectDetails, setProjectDetails] = useState<projectType>({
    title: "",
    description: "",
  });

  console.log(projectDetails);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    axios
      .get("/api/v1/project/getmyprojectinfo", { headers })
      .then((response) => {
        console.log(response);
        if (response.status === 200 && response.data?.project?.length > 0) {
          setIsProjectCreated(true);
          setProjectDetails({
            title: response.data?.project[0].title,
            description: response.data?.project[0].description,
          });

          setTitle(response.data?.project[0].title);
          setDescription(response.data?.project[0].description);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    if (!title) {
      Notify("error", "Title is required");
      return;
    }
    if (!description) {
      Notify("error", "Description is required");
      return;
    }

    const data = {
      title: title,
      description: description,
    };
    console.log(data);
    setButtonLoad(true);
    axios
      .post("/api/v1/project/createproject", data, { headers })
      .then((response) => {
        console.log(response);
        if (response.status === 201 || response.status === 200) {
          Notify("success", "Project Created");
          setTitle("");
          setDescription("");
          setButtonLoad(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        setButtonLoad(false);
      });
  };
  console.log(isProjectCreated);

  const handleEdit = (e: MouseEvent) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };
    if (!title) {
      Notify("error", "Updated Title is required");
      return;
    }
    if (!description) {
      Notify("error", "Updated Description is required");
      return;
    }
    const data = {
      title: title,
      description: description,
    };

    console.log(data);
    setButtonLoad(true);
    axios
      .put("/api/v1/project/updatemyprojectinfo", data, { headers })
      .then((response) => {
        console.log(response);
        if (response.status === 201 || response.status === 200) {
          Notify("success", "Project details updated");
          setTitle("");
          setDescription("");
          setButtonLoad(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        setButtonLoad(false);
      });
  };

  return (
    <div>
      <h1 className="text-2xl capitalize font-semibold">My Project</h1>
      <Separator className="my-4 bg-black" />
      <section>
        <div className="space-y-4">
          {!isProjectCreated && (
            <Card className="bg-blue-100">
              <CardHeader>
                <CardTitle>Create Project</CardTitle>
                <CardDescription>
                  Create your Project here. Click create project when done
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., The Avengers"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    placeholder="e.g., The Avengers"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={buttonLoad} onClick={handleSubmit}>
                  {buttonLoad && (
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  )}
                  Create Project
                </Button>
              </CardFooter>
            </Card>
          )}
          {isProjectCreated && (
            <Card className="bg-blue-100">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                  Your Project details are as follows:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    disabled={isDisabled}
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    disabled={isDisabled}
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-4">
                  {isDisabled && (
                    <Button onClick={() => setIsDisabled(!isDisabled)}>
                      Edit Project
                    </Button>
                  )}
                  {!isDisabled && (
                    <>
                      <Button className="bg-green-500" onClick={handleEdit}>
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
              </CardFooter>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

export default Project;
