import * as React from "react";
import {Container} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FliprApp from "./components/flipr/FliprApp";
import useFliprs from "./components/hooks/useFliprs";
import useUsers from "./components/hooks/useUsers";
import LoginApp from "./components/login/LoginApp";
import Navigation from "./components/navigation/Navigation";
import FliprDetails from "./components/flipr/FliprDetails";

export default function App(){

    const {fliprs, saveFlipr, deleteFlipr} = useFliprs();
    const {username, login, logout} = useUsers();

    return (
        <BrowserRouter>
            <Navigation logout={logout} username={username} />
            <Container maxWidth={false} sx={{mt: 3}}>
                <Routes>
                    <Route path={"/"} element={<FliprApp deleteFlipr={deleteFlipr} saveFlipr={saveFlipr} username={username} fliprs={fliprs} />} />
                    <Route path={"/flipr/:id"} element={<FliprDetails deleteFlipr={deleteFlipr} username={username} />} />
                    <Route path={"/login"} element={<LoginApp login={login} />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );

}
