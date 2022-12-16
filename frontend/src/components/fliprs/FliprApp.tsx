import FliprGallery from "./FliprGallery";
import {useEffect, useState} from "react";
import {Flipr} from "../models/Flipr";
import axios from "axios";

export default function FliprApp(){

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

    return(
        <FliprGallery fliprs={fliprs} />
    )
}