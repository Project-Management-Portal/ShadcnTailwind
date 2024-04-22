import Navbar from "@/components/custom/Navbar";
import collabImage from "../assets/collab.svg";
import { Button } from "@/components/ui/button";
import Footer from "@/components/custom/Footer";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Navbar />
        <section>
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col items-center lg:items-start justify-center order-2 lg:order-1 lg:pl-20">
              <h1 className="text-3xl text-black text-center lg:text-start lg:text-5xl font-bold tracking-wide">
                Streamline Your <span className="text-blue-700">Workflow</span>,
                Sync Your <span className="text-blue-700">Success</span>.
              </h1>
              <p className="font-medium tracking-widest text-lg text-center lg:text-start lg:text-xl mt-1 lg:mt-2 mb-8 lg:mb-10">
                Empower Your Projects with TaskSync
              </p>
              <Button
                className="hover:bg-gray-600"
                onClick={() => navigate("/register")}
              >
                Get Started
              </Button>
            </div>
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <img
                className="w-[60%] lg:w-[80%] h-auto"
                src={collabImage}
                alt="Hero section image"
              />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Home;
