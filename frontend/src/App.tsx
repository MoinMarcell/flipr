import * as React from "react";
import {BrowserRouter, Routes} from "react-router-dom";
import FliprTopBar from "./components/appBar/FliprTopBar";
import useUsers from "./components/hooks/useUsers";

export default function App(){

    const {username, isAuthenticated, login, logout} = useUsers();

    return (
        <BrowserRouter>
            <FliprTopBar logout={logout} login={login} username={username} isAuthenticated={isAuthenticated} />
            <Routes>

            </Routes>
        </BrowserRouter>
    );

}
