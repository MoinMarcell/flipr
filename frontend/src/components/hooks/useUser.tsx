import {useCallback, useEffect, useState} from "react";
import {FliprUser} from "../models/FliprUser";
import axios from "axios";

export default function useUser(username: string | undefined){

    const emptyUser = {
        "id": "",
        "username": "",
        "fliprs": []
    }

    const [user, setUser] = useState<FliprUser>(emptyUser);

    const getFliprUser = useCallback(async () => {
        const response = await axios.get("/api/users/" + username);
        const data = await response.data;
        setUser(data);
        return data;
    }, [username]);

    useEffect(() => {
        getFliprUser()
            .catch(e => console.error(e));
    }, [getFliprUser]);

    return {user};
}