import {useCallback, useEffect, useState} from "react";
import axios from "axios";

const BASE_DIR: string = "/api/users";

export default function useUsers(){
    const [username, setUsername] = useState<string>("anonymousUser");

    useEffect(() => {
        axios.get(BASE_DIR + "/me")
            .then((response) => response.data)
            .then((data) => {
                setUsername(data)
                return data;
            });
    });

    const login = useCallback(async (username: string, password: string) => {
        return axios.post(BASE_DIR + "/login", undefined, {
            auth:{
                "username": username,
                "password": password
            }
        })
            .then((response) => response.data)
            .then((data) => {
                setUsername(data);
                return data;
            });
    }, []);

    const logout = useCallback(() => {
        return axios.post(BASE_DIR + "/logout")
            .then((response) => response.data)
            .then((data) => {
                setUsername(data);
                return data;
            });
    }, [])

    return {username, login, logout};
}