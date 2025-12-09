import { Outlet } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";

export function ProtectedRoute() {
  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
}
