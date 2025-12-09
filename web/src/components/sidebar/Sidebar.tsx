import { Link, NavLink } from "react-router-dom";
import {
  Clock,
  CloudUpload,
  Home,
  Plus,
  Settings,
  Star,
  Trash2,
} from "lucide-react";
import type { ComponentType } from "react";

const menuItems = [
  {
    Icon: Home,
    to: "/my-drive",
    label: "MyDrive",
  },
  {
    Icon: Clock,
    to: "/recent",
    label: "Recent",
  },
  {
    Icon: Star,
    to: "/starred",
    label: "Starred",
  },
  {
    Icon: Trash2,
    to: "/trash",
    label: "Trash",
  },
];

interface MenuItemProps {
  Icon: ComponentType<{ size?: number; className?: string }>;
  to: string;
  label: string;
}

function MenuItem({ Icon, to = "", label = "" }: MenuItemProps) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${isActive && "menu-active"} py-2 rounded-2xl`
        }
      >
        {Icon && <Icon size={20} className="opacity-80" />}
        {label}
      </NavLink>
    </li>
  );
}

function Menu() {
  return (
    <ul className="menu w-full gap-1 p-0">
      {menuItems.map((item) => (
        <MenuItem key={item.to} {...item} />
      ))}
    </ul>
  );
}

function Logo() {
  return (
    <div className="ml-3">
      <Link to="/" className="flex items-center gap-2">
        <CloudUpload size={30} className="text-primary" />
        <span className="text-xl font-black">Cloudio</span>
      </Link>
    </div>
  );
}

function NewButton() {
  return (
    <div className="mt-5 ml-2">
      <button className="btn !py-6 rounded-2xl w-28 justify-start">
        <Plus size={25} />
        <span>New</span>
      </button>
    </div>
  );
}

function SettingsButton() {
  return (
    <div className="mt-auto mb-0">
      <button className="btn rounded-2xl w-full justify-start">
        <Settings size={20} />
        <span>Settings</span>
      </button>
    </div>
  );
}

export function Sidebar() {
  return (
    <>
      <aside className="min-w-64 bg-base-100 border-r border-white/10">
        <div className="w-full h-screen flex flex-col gap-3 p-3">
          {/* Logo */}
          <Logo />

          {/* New */}
          <NewButton />

          {/* Menu */}
          <Menu />

          {/* Settings */}
          <SettingsButton />
        </div>
      </aside>
    </>
  );
}
