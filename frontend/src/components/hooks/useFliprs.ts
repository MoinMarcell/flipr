import {useCallback, useEffect, useState} from "react";
import {Flipr} from "../models/Flipr";
import axios from "axios";
import {CommentDTO} from "../models/FliprDTO";

const BASE_DIR: string = "/api/fliprs";

export default function useFliprs() {
    const [fliprs, setFliprs] = useState<Flipr[]>([]);

    const getAllFliprs = useCallback(async () => {
        const response = await axios.get(BASE_DIR);
        const data = await response.data;
        setFliprs(data);
        return data;
    }, []);

    const saveFlipr = useCallback(async (fliprToSave: CommentDTO) => {
        const response = await axios.post(BASE_DIR, fliprToSave);
        await getAllFliprs();
        return await response.data;
    }, [getAllFliprs]);

    const deleteFlipr = useCallback(async (id: string) => {
        const response = await axios.delete(BASE_DIR + "/" + id);
        const data = await response.data;
        await getAllFliprs();
        return data;
    }, [getAllFliprs]);

    const addFliprToFavorites = useCallback(async (username: string, fliprId: string) => {
        const response = await axios.put(BASE_DIR + "/add-flipr-to-favorites/" + username + "/" + fliprId);
        await getAllFliprs();
        return await response.data;
    }, [getAllFliprs]);

    const isLikedFlipr = useCallback(async (username: string, fliprId: string) => {
        const response = await axios.get(BASE_DIR + "/check-is-liked-flipr/" + username + "/" + fliprId);
        const data = await response.data;
        await getAllFliprs();
        return data;
    }, [getAllFliprs]);

    useEffect(() => {
        getAllFliprs()
            .catch(e => console.error(e));
    }, [getAllFliprs])

    return {fliprs, saveFlipr, deleteFlipr, addFliprToFavorites, isLikedFlipr}
}