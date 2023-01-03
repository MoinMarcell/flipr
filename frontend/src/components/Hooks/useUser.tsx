import {useEffect, useState} from "react";
import axios from "axios";

export default function useUser(){
    const [username, setUsername] = useState<string>("")

    useEffect(() => {
        axios.get("/api/users/me")
            .then(r => r.data)
            .then(setUsername)
    }, [])

    function login(username: string, password: string){
        return axios.post("/api/users/login", undefined, {
            auth: {
                username,
                password
            },
        })
            .then((r) => r.data)
            .then(data => {
                setUsername(data)
                return data
            });
    }

    function logout(){
        return axios.post("/api/users/logout")
            .then((r) => r.data)
            .then((data) => {
                setUsername(data)
                return data
            })
    }

    return {username, login, logout}
}