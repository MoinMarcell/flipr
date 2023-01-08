import {useEffect, useState} from "react";
import axios from "axios";
import {FliprUser} from "../Models/FliprUser";

export default function useUser() {

    const emptyFliprUser = {
        "fliprID": "",
        "username": "",
        "email": "",
        "fliprList": []
    }

    const [username, setUsername] = useState<string>("")
    const [fliprUser, setFliprUser] = useState<FliprUser>(emptyFliprUser)

    useEffect(() => {
        axios.get("/api/users/me")
            .then(r => r.data)
            .then(setUsername)
        axios.get("/api/fliprusers/user?username=" + username)
            .then(r => r.data)
            .then(setFliprUser)
    }, [username])

    function login(username: string, password: string) {
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

    function logout() {
        return axios.post("/api/users/logout")
            .then((r) => r.data)
            .then((data) => {
                setUsername(
                    data)
                return data
            })
    }

    function register(username: string, email: string, password: string) {
        axios.post("/api/users/register", {
            username: username,
            email: email,
            password: password,
            fliprList: []
        }).catch(e => console.error(e));
    }

    return {username, login, logout, register, fliprUser}
}