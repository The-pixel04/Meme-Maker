import { createContext } from "react";

export const ErrorContext = createContext({
    message: '',
    errorHandler: () => null,
});