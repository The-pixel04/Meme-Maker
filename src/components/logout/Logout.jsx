import { Navigate } from "react-router";
import { Spin } from "antd";
import { useLogout } from "../../api/authApi";

export default function Logout() {
    const { isLoggedOut } = useLogout()

    return isLoggedOut
        ? <Navigate to="/" />
        : <Spin/>; // spinner is better
}