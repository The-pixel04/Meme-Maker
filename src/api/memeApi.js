import { useEffect, useState } from "react";
import request from "../utils/request.js";
import { Spin } from "antd";
import useAuth from "../hooks/useAuth.js";
const baseUrl = 'https://parseapi.back4app.com/classes'

export const useCreateMeme = () => {

    const create = (memeData, objectId) => {
        return request.post(`${baseUrl}/memes`, { ...memeData, ownerId: objectId });
    }

    return {
        create
    }
};

export const useMemes = () => {
    const [memes, setMemes] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        request.get(`${baseUrl}/memes`)
            .then(result => {
                setMemes(result);
                setLoading(false)
            })
    }, []);

    return {
        memes,
        loading
    }
};

export const useMeme = (memeId) => {
    const [meme, setMeme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        request.get(`${baseUrl}/memes/${memeId}`)
            .then(result => {
                setMeme(result);
                setLoading(false);
            });
    }, []);

    return {
        meme,
        loading
    }
};

export const useEditMeme = () => {
    const { request } = useAuth();

    const edit = (memeId, memeData) => {
        return request.put(`${baseUrl}/memes/${memeId}`, memeData);
    };

    return {
        edit
    }
}

export const useDeleteMeme = () => {
    const { request } = useAuth();

    const deleteMeme = (memeData) => {
        console.log(memeData)
        return request.delete(`${baseUrl}/memes/${memeData.objectId}`, null);
    };

    return {
        deleteMeme
    }
}

export const useLast3Memes = () => {
    const [last3Memes, setLast3Memes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        request.get(`${baseUrl}/memes?order=-createdAt&limit=3`)
            .then(result => {
                setLast3Memes(result);
                setLoading(false);
            });

    }, []);

    return {
        last3Memes,
        loading
    };
}