import { useCallback, useContext, useMemo } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/UserContext.js";

export default function useAuth() {
    const { sessionToken, ...authData } = useContext(UserContext);

    const requestWrapper = useCallback((method, url, data, options = {}) => {
        const authOptions = {
            ...options,
            headers: {
                "X-Parse-Session-Token": sessionToken,
                ...options.headers,
            },
        };

        return request.baseRequest(method, url, data, sessionToken ? authOptions : options);
    }, [sessionToken]);

    const requestObject = useMemo(() => ({
        get: requestWrapper.bind(null, "GET"),
        post: requestWrapper.bind(null, "POST"),
        put: requestWrapper.bind(null, "PUT"),
        delete: requestWrapper.bind(null, "DELETE"),
    }), [requestWrapper]);

    return {
        ...authData,
        sessionToken,
        userId: authData._id,
        isAuthenticated: !!sessionToken,
        request: requestObject,
    };
};
