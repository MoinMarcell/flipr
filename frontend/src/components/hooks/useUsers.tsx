import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {FliprUserDTO} from "../model/FliprUserDTO";

const BASE_DIR: string = "/api/users";

export default function useUsers() {
    const [username, setUsername] = useState<string>("anonymousUser");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        axios.get(BASE_DIR + "/me")
            .then((response) => response.data)
            .then((data) => {
                setUsername(data)
                return data;
            });
    });

    const login = useCallback(async (userToLogin: FliprUserDTO) => {
        const response = await axios.post(BASE_DIR + "/login", undefined, {
            auth: {
                "username": userToLogin.username,
                "password": userToLogin.password,
            }
        });
        const data = await response.data;
        setUsername(data);
        return data;
    }, []);

    const logout = useCallback(() => {
        return axios.post(BASE_DIR + "/logout")
            .then((response) => response.data)
            .then((data) => {
                setUsername(data);
                return data;
            });
    }, []);

    const saveUser = useCallback(async (userToRegister: FliprUserDTO) => {
        setIsLoading(true);
        const response = await axios.post(BASE_DIR + "/register", userToRegister);
        const data = await response.data;
        setIsLoading(false);
        return data;
    }, [])

    return {username, login, logout, saveUser, isLoading};
}