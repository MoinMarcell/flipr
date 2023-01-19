import * as React from "react";
import FliprApp from "./components/Flipr/FliprApp";
import useUsers from "./components/hooks/useUsers";
import {Container} from "@mui/material";
import NavBarApp from "./components/NavBar/NavBarApp";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PublicProfile from "./components/FliprUser/PublicProfile";
import LoginRegisterApp from "./components/login/LoginRegisterApp";
import FliprDetails from "./components/Flipr/FliprDetails";

const App = () => {

    const {username, login, logout, saveUser} = useUsers();

    return (
        <BrowserRouter>
            <NavBarApp username={username} logout={logout}/>
            <Container maxWidth={false} sx={{mt: 2}}>
                <Routes>
                    <Route path={"/"} element={<FliprApp username={username}/>}/>
                    <Route path={"/flipr/:id"} element={<FliprDetails username={username}/>}/>
                    <Route path={"/register"} element={<LoginRegisterApp register={saveUser} login={login}/>}/>
                    <Route path={"/login"} element={<LoginRegisterApp register={saveUser} login={login}/>}/>
                    <Route path={"/user/:username"} element={<PublicProfile username={username}/>}/>
                </Routes>
            </Container>
        </BrowserRouter>
    );

}

export default App;
