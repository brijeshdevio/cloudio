import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components";

export function ProtectLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
