import { Outlet } from "react-router-dom";
import { ProtectNavbar, Sidebar } from "@/components";

export function ProtectLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full">
        <ProtectNavbar />
        <Outlet />
      </main>
    </div>
  );
}
