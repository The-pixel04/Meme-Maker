import { Navigate } from "react-router";
import { useLogout } from "../../api/authApi";
import { Spin } from "antd";

export default function Logout() {
    const { isLoggedOut } = useLogout()

    return isLoggedOut
        ? <Navigate to="/" />
        : <Spin/>; // spinner is better
}