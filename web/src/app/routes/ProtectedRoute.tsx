import { Navigate, Outlet } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { useAuth } from "../providers";
import { Modals } from "@/components";

export function ProtectedRoute() {
  const { isAuthenticated, user } = useAuth();

  return isAuthenticated && user ? (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
      <Modals />
    </>
  ) : (
    <Navigate to={"/login"} replace />
  );
}
