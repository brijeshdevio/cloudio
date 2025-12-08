import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components";

export function ProtectLayout() {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
