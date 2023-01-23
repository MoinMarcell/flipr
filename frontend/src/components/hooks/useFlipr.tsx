import {useCallback, useEffect, useState} from "react";
import {Flipr} from "../model/Flipr";
import axios from "axios";

export default function useFlipr(username: string, id: string | undefined){
    console.log(username);
    const emptyFlipr = {
        "id": "",
        "content": "",
        "author": "",
        "dateTime": new Date(),
        "comments": [],
        "likes": 0,
    };
    const [flipr, setFlipr] = useState<Flipr>(emptyFlipr);
    
    const getFlipr = useCallback(async () => {
        const response = await axios.get("/api/fliprs/flipr?id=" + id)
        const data = await response.data;
        setFlipr(data);
        return data;
    }, [id]);

    const postComment = useCallback(async (commentToSave: string, fliprId: string) => {
        const response = await axios.post("/api/comments", {
            "content": commentToSave,
            "author": username,
            "fliprId": fliprId,
        });
        const data = await response.data;
        console.log(data);
        console.log(username);
        await getFlipr();
        return data;
    }, [getFlipr, username]);
    
    useEffect(() => {
        getFlipr()
            .catch(e => console.error(e));
    }, [getFlipr])

    return {flipr, postComment};
    
}