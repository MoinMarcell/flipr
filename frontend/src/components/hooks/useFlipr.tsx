import {useCallback, useEffect, useState} from "react";
import {Flipr} from "../model/Flipr";
import axios from "axios";

export default function useFlipr(username: string, id: string | undefined){
    
    const emptyFlipr = {
        "id": "",
        "content": "",
        "author": "",
        "dateTime": new Date(),
        "comments": []
    };
    const [flipr, setFlipr] = useState<Flipr>(emptyFlipr);
    
    const getFlipr = useCallback(async () => {
        const response = await axios.get("/api/fliprs/flipr?id=" + id)
        const data = await response.data;
        setFlipr(data);
        return data;
    }, [id]);

    const postComment = useCallback(async (content: string) => {
        const response = await axios.post("/api/comments", {
            "content": content,
            "author": username,
            "fliprId": flipr.id,
        });
        const data = await response.data;
        getFlipr().catch(e => console.error(e));
        return data;
    }, [flipr.id, getFlipr, username]);
    
    useEffect(() => {
        getFlipr()
            .catch(e => console.error(e));
    }, [getFlipr])

    return {flipr, postComment};
    
}