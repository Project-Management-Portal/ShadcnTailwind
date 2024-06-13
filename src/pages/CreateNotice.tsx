import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Textarea } from "@/components/ui/textarea";
import DragAndDrop from "@/components/custom/DragAndDrop";
import { MouseEvent, useState } from "react";
import Notify from "@/helpers/Notify";
import axios from "axios";
import { Loader2, Upload } from "lucide-react";

const providesOptions: { id: number; value: string; label: string }[] = [
  { id: 1, value: "academics", label: "All students" },
  { id: 2, value: "events", label: "All Guide" },
  { id: 3, value: "general", label: "Group name" },
];
function CreateNotice() {
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmitFile(e: MouseEvent) {
    e.preventDefault();
    console.log(title, description, files, category);
    if (title === "") {
      Notify("error", "Please enter a title for the notice");
      return;
    }
    if (category === "") {
      Notify("error", "Please select a category for the notice");
      return;
    }
    if (files.length === 0) {
      Notify("error", "Please select a file to upload");
      return;
    }
    if (description === "") {
      Notify("error", "Please enter a description for the notice");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    files.forEach((file) => formData.append("files", file));
    setIsLoading(true);
    axios
      .post("/api/v1/notices", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          auth_token: localStorage.getItem("auth_token") || "",
        },
      })
      .then((response) => {
        if (response.status == 200) {
          Notify("success", "Notice created successfully");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        Notify("error", "Error occured while creating notice");
        setIsLoading(false);
      });
  }
  return (
    <>
      <div>
        <h1 className="text-2xl capitalize font-semibold">Create notice</h1>
        <Separator className="my-4 bg-black" />
        <Card className="w-full bg-blue-100">
          <CardHeader>
            <CardTitle>Enter notice Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Title of the notice"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    placeholder="Description of the notice."
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="files">Files</Label>
                  <DragAndDrop files={files} setFiles={setFiles} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(val) => setCategory(val)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Category" />
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              disabled={isLoading}
              onClick={handleSubmitFile}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              ) : (
                <Upload className="mr-2 w-4 h-4" />
              )}
              Upload
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default CreateNotice;
