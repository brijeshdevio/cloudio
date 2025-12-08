import { NavLink } from "react-router-dom";
import { menuItems } from "./utils";
import type { MenuItemProps } from "./type";

function MenuItem({ Icon, to = "", label = "" }: MenuItemProps) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? "menu-active py-2" : "py-2")}
      >
        <Icon size={20} />
        <span>{label}</span>
      </NavLink>
    </li>
  );
}

export function SidebarMenu() {
  return (
    <ul className="menu w-full gap-2">
      {menuItems.map((item) => (
        <MenuItem key={item.label} {...item} />
      ))}
    </ul>
  );
}
