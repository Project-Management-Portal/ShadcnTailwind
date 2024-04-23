import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import { NavLink,useParams } from "react-router-dom";

function Assessment() {
  const {id} = useParams();
  return (
    <div>
      <h1 className="text-2xl capitalize font-semibold">Project Assesment</h1>
      <Separator className="my-4 bg-black" />
      <div className="">
        <NavLink to="/guideprojects" className="flex items-center mb-2">
          <ChevronLeft className="w-5 h-5 mr-2" />
          <h5 className="text-black text-lg underline">Back to all projects</h5>
        </NavLink>
      </div>
      <section className="mt-4">
        <NavLink
          to={`/firstreview/${id}`}
          className="flex items-center px-6 py-4 bg-blue-300 rounded-md"
        >
          <h5 className="text-black text-lg font-semibold text-center">
            First Review
          </h5>
        </NavLink>
      </section>
    </div>
  );
}

export default Assessment;
