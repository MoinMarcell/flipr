import {useCallback, useEffect, useState} from "react";
import {Flipr} from "../Model/Flipr";
import axios from "axios";

const BASE_DIR: string = "/api/fliprs/";

export default function useFlipr(id: string | undefined) {

    const [flipr, setFlipr] = useState<Flipr>();

    const getFlipr = useCallback((id: string) => {
        axios.get((BASE_DIR + id))
            .then((response) => response.data)
            .then((data) => {
                setFlipr(data);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (id) {
            getFlipr(id);
        }
    }, [getFlipr, id]);

    return {flipr};

}
