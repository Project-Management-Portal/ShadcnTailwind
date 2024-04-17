import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="bg-slate-200">
        <footer className="container mx-auto flex flex-col lg:flex-row items-center justify-between mt-12 py-8">
          <div>
            <h1 className="text-xl text-gray-400"> &copy; 2024 TaskSync</h1>
          </div>
          <ul className="flex items-center flex-wrap gap-4">
            <li className="text-lg font-medium hover:text-blue-600 hover:underline">
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li className="text-lg font-medium hover:text-blue-600 hover:underline">
              <NavLink to={"/"}>About</NavLink>
            </li>
            <li className="text-lg font-medium hover:text-blue-600 hover:underline">
              <NavLink to={"/"}>Contact</NavLink>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}

export default Footer;
