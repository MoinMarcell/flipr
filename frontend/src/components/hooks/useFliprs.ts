import {useCallback, useEffect, useState} from "react";
import {Flipr} from "../model/Flipr";
import axios from "axios";
import {FliprDTO} from "../model/FliprDTO";

const BASE_DIR: string = "/api/fliprs";

export default function useFliprs(){
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
    
    const saveFlipr = (fliprToSave: FliprDTO) => {
        return axios.post(BASE_DIR, fliprToSave)
            .then((response) => response.data)
            .then((data) => {
                getAllFliprs();
                return data;
            })
            .catch((error) => console.error(error));
    }
    
    useEffect(() => {
        getAllFliprs();
    }, [getAllFliprs])
    
    return {fliprs, saveFlipr}
}