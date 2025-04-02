import { useContext, useEffect, useState } from "react";
import request from "../utils/request.js";
import useAuth from "../hooks/useAuth.js";
import { ErrorContext } from "../contexts/ErrorContext.js";
import abortController from "../utils/abortController.js";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/classes`

export const useCreateMeme = () => {
    const { errorHandler } = useContext(ErrorContext);
    const { signal } = abortController();

    const create = async (memeData, objectId) => {
        try {
            const result = await request.post(`${baseUrl}/memes`, { ...memeData, ownerId: objectId }, { signal });

            if (!result || result.error) {
                throw new Error(result.response);
            };

            return result;
        } catch (error) {
            if (error.name === "AbortError") {
                return null;
            }

            errorHandler(`Error creating meme (every field is required)`);
            return null;
        }
    }

    return {
        create
    }
};

export const useMemes = (page, pageSize) => {
    const [memes, setMemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const { errorHandler } = useContext(ErrorContext);

    useEffect(() => {
        const { signal, abort } = abortController();
        const params = new URLSearchParams({
            count: 1,
            limit: pageSize.toString(),
            skip: ((page - 1) * pageSize).toString(),
        });

        request.get(`${baseUrl}/memes?${params.toString()}`, {}, { signal })
            .then(result => {
                setCount(result.count);
                setMemes(result.results);
                setLoading(false)
            })
            .catch(error => {
                if (error.name === "AbortError") {
                    return null;
                }
                errorHandler(`Error fetching memes`);
                return null;
            });

        return () => {
            abort();
        }

    }, [page]);

    return {
        memes,
        count,
        loading
    }
};

export const useMeme = (memeId) => {
    const [meme, setMeme] = useState({});
    const [loading, setLoading] = useState(true);
    const { errorHandler } = useContext(ErrorContext);

    useEffect(() => {
        const { signal, abort } = abortController();
        request.get(`${baseUrl}/memes/${memeId}`, {}, { signal })
            .then(result => {
                setMeme(result);
                setLoading(false);
            })
            .catch(error => {
                if (error.name === "AbortError") {
                    return null;
                }
                errorHandler(`Error fetching meme`);
                return null;
            });

        return () => {
            abort();
        }
    }, [memeId]);

    return {
        meme,
        loading
    }
};

export const useEditMeme = () => {
    const { request } = useAuth();
    const { signal } = abortController();
    const { errorHandler } = useContext(ErrorContext);

    const edit = (memeId, memeData) => {
        try {
            const result = request.put(`${baseUrl}/memes/${memeId}`, memeData, { signal });

            if (!result || result.error) {
                throw new Error(result.response);
            };

            return result;
        } catch (error) {
            if (error.name === "AbortError") {
                return null;
            }

            errorHandler(`Error editing meme`);
            return null;
        }
    };

    return {
        edit
    }
}

export const useDeleteMeme = () => {
    const { request } = useAuth();
    const { signal } = abortController();
    const { errorHandler } = useContext(ErrorContext);

    const deleteMeme = (memeData) => {
        try {
            const result = request.delete(`${baseUrl}/memes/${memeData.objectId}`, null, { signal });

            if (!result || result.error) {
                throw new Error(result.response);
            };

            return result;
        } catch (error) {
            if (error.name === "AbortError") {
                return null;
            }

            errorHandler(`Error deleting meme`);
            return null;
        }
    };

    return {
        deleteMeme
    }
}

export const useLast3Memes = () => {
    const [last3Memes, setLast3Memes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { errorHandler } = useContext(ErrorContext);

    useEffect(() => {
        const { signal, abort } = abortController();
        request.get(`${baseUrl}/memes?order=-createdAt&limit=3`, {}, { signal })
            .then(result => {
                setLast3Memes(result);
                setLoading(false);
            })
            .catch(error => {
                if (error.name === "AbortError") {
                    return null;
                }
                errorHandler(`Error fetching last 3 memes`);
                return null;
            });

        return () => {
            abort();
        }

    }, []);

    return {
        last3Memes,
        loading
    };
};

export const useUserMemes = (ownerId) => {
    const [userMemes, setUserMemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { errorHandler } = useContext(ErrorContext);

    useEffect(() => {
        const { signal, abort } = abortController();
        const params = new URLSearchParams({
            where: JSON.stringify({ ownerId }),
        });

        request.get(`${baseUrl}/memes?${params.toString()}`, {}, { signal })
            .then(result => {
                setUserMemes(result);
                setLoading(false);
            })
            .catch(error => {
                if (error.name === "AbortError") {
                    return null;
                }
                errorHandler(`Error fetching user memes`);
                return null;
            });

        return () => {
            abort();
        }
    }, [ownerId]);

    return {
        userMemes,
        loading
    };
};

export const useLikeMeme = () => {
    const { request } = useAuth();
    const { signal } = abortController();
    const { errorHandler } = useContext(ErrorContext);

    const like = (memeId, memeData) => {
        try {
            const result = request.put(`${baseUrl}/memes/${memeId}`, memeData, { signal });

            if (!result || result.error) {
                throw new Error(result.message);
            };

            return result;
        } catch (error) {
            if (error.name === "AbortError") {
                return null;
            }

            errorHandler(`Error liking meme`);
            return null;
        }
    };

    return {
        like
    }
}

export const useUnlikeMeme = () => {
    const { signal } = abortController();
    const { errorHandler } = useContext(ErrorContext);

    const unlike = async (memeId, memeData) => {
        try {
            const result = await request.put(`${baseUrl}/memes/${memeId}`, memeData, { signal });

            if (!result || result.error) {
                throw new Error(result.message);
            }

            return result;
        } catch (error) {
            if (error.name === "AbortError") {
                return null;
            }

            errorHandler(`Error unliking meme`);
            return null;
        }
    };

    return {
        unlike,
    };
};