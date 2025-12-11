import { Navigate, Outlet } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useAuth } from "../providers";

export function AuthRoute() {
  const { isAuthenticated, user } = useAuth();

  return isAuthenticated && user ? (
    <Navigate to={"/my-drive"} replace />
  ) : (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
