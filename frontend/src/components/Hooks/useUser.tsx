import {useCallback, useEffect, useState} from "react";
import {FliprUser} from "../Model/FliprUser";
import axios from "axios";

const BASE_DIR: string = "/api/users/";

export default function useUser(username: string) {

    const [user, setUser] = useState<FliprUser>();

    const getFliprUser = useCallback((username: string) => {
        axios.get((BASE_DIR + username))
            .then((response) => response.data)
            .then((data) => {
                setUser(data);
                return data;
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (username) {
            getFliprUser(username);
        }
    }, [getFliprUser, username]);

    return {user}

}
