import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Spinner } from "../ui/spinner";

export function RequireAuth() {
    const {
        data,
        isLoading
    } = useAuth();

    if (isLoading) {
        return <Spinner />;
    }

    if (!data) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}