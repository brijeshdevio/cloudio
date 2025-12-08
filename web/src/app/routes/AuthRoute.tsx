import { Outlet } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";

export function AuthRoute() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
