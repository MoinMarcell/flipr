import {Flipr} from "../Model/Flipr";
import axios from "axios";
import {useCallback, useEffect, useState} from "react";

const BASE_DIR: string = "/api/fliprs/";

export default function useFliprs() {
    const [fliprs, setFliprs] = useState<Flipr[]>([]);

    const getAllFliprs = useCallback(() => {
        axios.get(BASE_DIR)
            .then((response) => response.data)
            .then((data) => {
                setFliprs(data);
                return data;
            })
            .catch((error) => console.error(error));
    }, []);

    const saveFlipr = useCallback((content: string, author: string) => {
        axios.post(BASE_DIR, {
            "content": content,
            "author": author,
        })
            .then((response) => response.data)
            .then((data) => {
                getAllFliprs();
                return data;
            })
            .catch((error) => console.error(error));
    }, [getAllFliprs]);

    const deleteFlipr = useCallback((id: string) => {
        axios.delete((BASE_DIR + id))
            .then((response) => response.data)
            .then((data) => {
                getAllFliprs();
                return data;
            });
    }, [getAllFliprs]);

    useEffect(() => {
        getAllFliprs();
    }, [getAllFliprs]);

    return {fliprs, saveFlipr, deleteFlipr};

}
