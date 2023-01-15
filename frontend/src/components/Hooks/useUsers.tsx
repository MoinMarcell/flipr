import {useCallback, useEffect, useState} from "react";
import {FliprUser} from "../Model/FliprUser";
import axios from "axios";

const BASE_DIR: string = "/api/users/";

export default function useUsers(){
    
    const [users, setUsers] = useState<FliprUser[]>([]);
    const [username, setUsername] = useState<string>("anonymousUser");

    const getUsername = useCallback(() => {
        axios.get((BASE_DIR + "me"))
            .then((response) => response.data)
            .then((data) => {
                setUsername(data);
                return data;
            })
            .catch((error) => console.error(error));
    }, [])

    const login = useCallback((username: string, password: string) => {
        axios.post((BASE_DIR + "login"), undefined, {
            auth:{
                "username": username,
                "password": password,
            }
        })
            .then((response) => response.data)
            .then((data) => {
                setUsername(data);
                return data;
            })
            .catch((error) => console.error(error));
    }, []);

    const logout = useCallback(() => {
        axios.post((BASE_DIR + "logout"))
            .then((response) => response.data)
            .then((data) => {
                setUsername(data);
                return data;
            })
    }, [])
    
    const getAllUsers = useCallback(() => {
        axios.get(BASE_DIR)
            .then((response) => response.data)
            .then((data) => {
                setUsers(data);
                return data;
            })
    }, []);
    
    const saveUser = useCallback((username: string, password: string) => {
        axios.post(BASE_DIR, {
            "username": username,
            "password": password,
        })
            .then((response) => response.data)
            .then(getAllUsers)
            .catch((error) => console.error(error));
    }, [getAllUsers]);

    const updateUser = useCallback((actualUsername: string, username: string, password: string) => {
        axios.put((BASE_DIR + actualUsername), {
            "username": username,
            "password": password,
        })
            .then((response) => response.data)
            .then((data) => {
                getAllUsers();
                logout();
                login(username, password);
                return data;
            })
            .catch((error) => console.error(error));
    }, [getAllUsers, login, logout]);
    
    const deleteUser = useCallback((username: string) => {
        axios.delete((BASE_DIR + username))
            .then((response) => response.data)
            .then(getAllUsers)
            .catch((error) => console.error(error));
    }, [getAllUsers]);
    
    useEffect(() => {
        getAllUsers();
        getUsername();
    }, [getAllUsers, getUsername]);
    
    return {users, saveUser, updateUser, deleteUser, username, login, logout};
    
}
