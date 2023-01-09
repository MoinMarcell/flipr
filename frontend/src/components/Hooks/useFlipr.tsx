import {useEffect, useState} from "react";
import {Flipr} from "../Model/Flipr";
import {getFliprById} from "../../api-calls";

export default function useFlipr(id: string | undefined){

    const emptyFlipr = {
        "content": "",
        "author": "",
    }

    const [flipr, setFlipr] = useState<Flipr>(emptyFlipr)

    useEffect(() => {
        if(id){
            getFlipr(id)
        }
    }, [id])

    function getFlipr(id: string){
        getFliprById(id)
            .then(data => setFlipr(data))
            .catch(e => console.error(e))
    }

    return{flipr}
}