import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
const activeLink =
  "flex items-center gap-4 bg-blue-300 px-2 py-2 rounded-md w-full";
const normalLink =
  "flex items-center gap-4 hover:bg-blue-100 px-2 py-2 rounded-md w-full";

interface TabProps {
  link: string;
  value: string;
  icon: ReactElement;
}

function SidebarTab({ link, value, icon }: TabProps) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => (isActive ? activeLink : normalLink)}
    >
      {icon}
      <div>
        <h4 className="text-sm font-medium">{value}</h4>
      </div>
    </NavLink>
  );
}

export default SidebarTab;
