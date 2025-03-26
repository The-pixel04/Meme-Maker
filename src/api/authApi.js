import { useEffect, useRef } from "react";
import request from "../utils/request.js"
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";


const baseUrl = 'https://parseapi.back4app.com'

export const useLogin = () => {
    const abortRef = useRef(new AbortController());

    const login = async (email, password) => {
        const headers = {
            'X-Parse-Revocable-Session': 1
        }
        const result = await request.post(`${baseUrl}/login`, { email, password }, { signal: abortRef.current.signal, headers: headers });

        return result
    }

    // useEffect(() => {
    //     const abortController = abortRef.current;

    //     return () => {abortController.abort()};
    // }, []);

    return {
        login
    }
};

export const useRegister = () => {
    const register = (username, email, password) => {
        const headers = {
            'X-Parse-Revocable-Session': 1
        }
        return request.post(`${baseUrl}/users`, { username, email, password }, { headers: headers });
    }

    return {
        register
    }
};

export const useLogout = () => {
    const {  sessionToken, userLogoutHandler } = useContext(UserContext);
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