const request = async (method, url, data, options = {}) => {
    options.method = method;

    options.headers = {
        "Cache-Control": "no-cache",
        'X-Parse-Application-Id': 'IqXIVQ7nttnrYA8QHMu2aqAeDlsqYFAa9RPc6Yrr',
        'X-Parse-REST-API-Key': 'drFUBNOEiyMrmWxCEz7YACQLBCRSBEWugrGOKnCr',
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Add body only for non-GET requests
    if (method !== 'GET' && data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        return;
    }
    
    const responseContentType = response.headers.get('Content-Type');
    if (!responseContentType) {
        return;
    }

    const result = await response.json();

    return result;

}
export default {
    get: request.bind(null, 'GET'),
    post: request.bind(null, 'POST'),
    put: request.bind(null, 'PUT'),
    delete: request.bind(null, 'DELETE'),
    baseRequest: request
}