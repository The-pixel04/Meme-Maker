import { createContext } from "react";

export const UserContext = createContext({
    objectId: "",
    email: "",
    username: "",
    password: "",
    sessionToken: "",
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
});
