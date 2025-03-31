import { useEffect } from "react";
import request from "../utils/request.js"
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";
import { ErrorContext } from "../contexts/ErrorContext.js";
import abortController from "../utils/abortController.js";


const baseUrl = import.meta.env.VITE_BASE_URL;

export const useLogin = () => {
    const { signal } = abortController()
    const { errorHandler } = useContext(ErrorContext);

    const login = async (email, password) => {
        const headers = {
            'X-Parse-Revocable-Session': 1
        }

        try {
            const result = await request.post(`${baseUrl}/login`, { email, password }, { signal, headers: headers });

            if (!result || result.error) {
                throw new Error(result.response);
            };

            return result;
        } catch (error) {
            if (error.name === "AbortError") {
                errorHandler("Login request was aborted");
                return null;
            }
            errorHandler(`Invalid email or password (${error.message})`);
            return null;
        }
    };

    return {
        login
    }
};

export const useRegister = () => {
    const { signal } = abortController();
    const { errorHandler } = useContext(ErrorContext);

    const register = async (username, email, password) => {
        const headers = {
            'X-Parse-Revocable-Session': 1
        }

        try {
            const result = await request.post(`${baseUrl}/users`, { username, email, password }, { signal, headers: headers });

            if (!result || result.error) {
                throw new Error(result.response);
            };

            return result;
        } catch (error) {
            if (error.name === "AbortError") {
                errorHandler("Register request was aborted");
                return null;
            }

            errorHandler(`Account already exist (${error.message})`);
            return null;
        }
    }

    return {
        register
    }
};

export const useLogout = () => {
    const { sessionToken, userLogoutHandler } = useContext(UserContext);
    const { errorHandler } = useContext(ErrorContext);
    useEffect(() => {
        if (!sessionToken) {
            return;
        }

        const options = {
            headers: {
                'X-Parse-Session-Token': sessionToken
            }
        };

        request.post(`${baseUrl}/logout`, null, options)
            .then(() => {
                userLogoutHandler()
            })
            .catch((error) => {
                errorHandler('Logout failed:', error.message);
            });
    }, [sessionToken, userLogoutHandler, errorHandler]);

    return {
        isLoggedOut: !!sessionToken
    }
};  