import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function RequireAuth() {
  const user = useAuth().data;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}