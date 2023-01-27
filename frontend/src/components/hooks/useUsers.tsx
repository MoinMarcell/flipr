import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {FliprUserDTO} from "../models/FliprUserDTO";

const BASE_DIR: string = "/api/users";

export default function useUsers() {
    const [username, setUsername] = useState<string>("");

    const isAuthenticated: boolean = username !== 'anonymousUser' && username !== null && username !== undefined;

    useEffect(() => {
        axios.get(BASE_DIR + "/me")
            .then((response) => response.data)
            .then((data) => {
                setUsername(data);
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

    const logout = useCallback(async () => {
        const response = await axios.post(BASE_DIR + "/logout")
        const data = await response.data;
        setUsername(data);
        return data;
    }, []);

    const saveUser = useCallback(async (userToRegister: FliprUserDTO) => {
        const response = await axios.post(BASE_DIR + "/register", userToRegister);
        return await response.data;
    }, []);

    return {username, login, logout, saveUser, isAuthenticated};
}