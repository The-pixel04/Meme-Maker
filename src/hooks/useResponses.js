import { useState } from "react";

export default function useResponses() {
    const [responses, setResponses] = useState([]);

    const addResponse = (response) => {
        setResponses(prev => [...prev, response]);
    };

    return {
        responses,
        addResponse
    };
}