import { useEffect, useRef } from "react";
import request from "../utils/request.js"
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";
import { ErrorContext } from "../contexts/ErrorContext.js";


const baseUrl = 'https://parseapi.back4app.com'

export const useLogin = () => {
    const abortRef = useRef(new AbortController());
    const { errorHandler } = useContext(ErrorContext);

    const login = async (email, password) => {
        const headers = {
            'X-Parse-Revocable-Session': 1
        }

        try {
            const result = await request.post(`${baseUrl}/login`, { email, password }, { signal: abortRef.current.signal, headers: headers });

            if (!result || result.error) {
                throw new Error(result.responce);
            };

            return result;
        } catch (error) {
            errorHandler(`Inavlid email or password (${error.message})`);
            return null;
        }



    };

    // useEffect(() => {
    //     const abortController = abortRef.current;

    //     return () => {abortController.abort()};
    // }, []);

    return {
        login
    }
};

export const useRegister = () => {
    const { errorHandler } = useContext(ErrorContext);

    const register = async (username, email, password) => {
        const headers = {
            'X-Parse-Revocable-Session': 1
        }

        try {
            const result = await request.post(`${baseUrl}/users`, { username, email, password }, { headers: headers });

            if (!result || result.error) {
                throw new Error(result.responce);
            };

            return result;
        } catch (error) {
            errorHandler(`Acount already exsist (${error.message})`);
            return null;
        }
    }

    return {
        register
    }
};

export const useLogout = () => {
    const { sessionToken, userLogoutHandler } = useContext(UserContext);
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
    }, [sessionToken, userLogoutHandler]);

    return {
        isLoggedOut: !!sessionToken
    }
};  