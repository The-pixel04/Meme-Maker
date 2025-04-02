import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth.js";

export default function GuestGuard() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}
