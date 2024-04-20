import errorImg from "../assets/404error.svg";

function PageNotFound() {
  return (
    <>
      <div className=" bg-blue-100">
        <div className="container h-screen w-full mx-auto flex items-center justify-center">
          <img src={errorImg} alt="page not found" className="w-1/2 h-auto" />
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
