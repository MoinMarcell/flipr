import {useCallback, useEffect, useState} from "react";
import {FliprUser} from "../models/FliprUser";
import axios from "axios";

export default function useUser(username: string | undefined){

    const emptyUser = {
        "id": "",
        "username": "",
        "fliprs": [],
        "likedFliprs": [],
    }

    const [user, setUser] = useState<FliprUser>(emptyUser);
    const [status, setStatus] = useState<number>(0);

    const getFliprUser = useCallback(async () => {
        const response = await axios.get("/api/users/" + username);
        const data = await response.data;
        setUser(data);
        setStatus(data.status);
        return data;
    }, [username]);

    useEffect(() => {
        if(username !== 'anonymousUser' && username !== null && username !== undefined) {
            getFliprUser()
                .then()
                .catch(e => setStatus(e.response.status));
        }
    }, [getFliprUser, username, status]);

    return {user, status};
}