import { useState } from "react";

export default function useError(state) {
    const [error, setError] = useState(state);

    const triggerError = (err) => {
        setError(err); // Update the error state
    };

    return [error, triggerError];
}