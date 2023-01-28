import {useCallback, useEffect, useState} from "react";
import {FliprUser} from "../model/FliprUser";
import axios from "axios";

export default function useUser(username: string | undefined){

    const emptyUser = {
        "id": "",
        "username": "",
        "fliprs": []
    }

    const [user, setUser] = useState<FliprUser>(emptyUser);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getFliprUser = useCallback(async () => {
        setIsLoading(true);
        const response = await axios.get("/api/users/" + username);
        const data = await response.data;
        setUser(data);
        setIsLoading(false);
    }, [username]);

    useEffect(() => {
        getFliprUser()
            .catch(e => console.error(e));
    }, [getFliprUser]);

    return {user, isLoading};
}