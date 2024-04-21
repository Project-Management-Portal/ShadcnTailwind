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
function Project() {
  return (
    <div>
      <h1 className="text-2xl capitalize font-semibold">My Project</h1>
      <Separator className="my-4 bg-black" />
      <section>
        <div className="space-y-4">
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
                <Input id="title" placeholder="e.g., The Avengers" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="description">Project Description</Label>
                <Textarea id="description" placeholder="e.g., The Avengers" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                {/* {buttonLoad && (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                )} */}
                Create Project
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default Project;
