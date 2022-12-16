import {useEffect, useState} from "react";
import {Flipr} from "../models/Flipr";
import axios from "axios";

export default function useFliprs(){
    const [fliprs, setFliprs] = useState<Flipr[]>([])

    useEffect(() => {
        getFliprs()
    }, [])

    function getFliprs(){
        axios.get("/api/fliprs")
            .then((response) => {
                setFliprs(response.data)
            })
            .catch(e => console.error(e))
    }

    return {fliprs}
}