const request = async (method, url, data, options = {}) => {
    options.method = method;

    options.headers = {
        "Cache-Control": "no-cache",
        "X-Parse-Application-Id": import.meta.env.VITE_APP_ID,
        "X-Parse-REST-API-Key": import.meta.env.VITE_REST_API_KEY,
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (method !== "GET" && data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        return;
    }

    const responseContentType = response.headers.get("Content-Type");
    if (!responseContentType) {
        return;
    }

    const result = await response.json();

    return result;

};
export default {
    get: request.bind(null, "GET"),
    post: request.bind(null, "POST"),
    put: request.bind(null, "PUT"),
    delete: request.bind(null, "DELETE"),
    baseRequest: request,
};
