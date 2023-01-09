import {useEffect, useState} from "react";
import {Flipr} from "../Model/Flipr";
import axios from "axios";
import {deleteFliprById} from "../../api-calls";

export default function useFliprs(){
    const [fliprs, setFliprs] = useState<Flipr[]>([]);

    useEffect(() => {
        getAllFliprs()
    }, [])

    function saveFlipr(content: string, username: string){
        return axios.post("/api/fliprs", {
            "content": content,
            "author": username
        })
            .then(getAllFliprs)
    }

    function getAllFliprs(){
        axios.get("/api/fliprs")
            .then(r => r.data)
            .then(setFliprs)
            .catch(e => console.error(e));
    }

    function deleteFlipr(id: string | undefined){
        deleteFliprById(id)
            .then(getAllFliprs)
    }

    return {fliprs, saveFlipr, getAllFliprs, deleteFlipr}
}