import { Navigate, Outlet } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { useAuth } from "../providers";

export function ProtectedRoute() {
  const { isAuthenticated, user } = useAuth();

  return isAuthenticated && user ? (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  ) : (
    <Navigate to={"/login"} replace />
  );
}
