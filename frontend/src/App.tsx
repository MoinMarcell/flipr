import NavigationBar from "./components/AppBar/NavigationBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Register from "./components/Register";

const App = () => {

    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        axios.get("/api/users/me")
            .then(r => r.data)
            .then(setUsername)
    }, [])

    function login(username: string, password: string) {
        return axios.post("/api/users/login", undefined, {
            auth: {
                "username": username,
                "password": password
            }
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

    return (
        <BrowserRouter>
            <NavigationBar handleLogout={logout} handleLogin={login} username={username}/>
            <Container sx={{mt: 10}}>
                <Routes>
                    <Route path={"/register"} element={<Register />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );

}

export default App;
