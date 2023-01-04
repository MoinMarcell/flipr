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

    function register(username: string, email: string, password: string){
        axios.post("/api/users/register", {
            username: username,
            email: email,
            password: password,
            fliprList: []
        }).catch(e => console.error(e));
    }

    return {username, login, logout, register}
}