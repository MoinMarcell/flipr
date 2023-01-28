import * as React from "react";
import {Container} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FliprApp from "./components/flipr/FliprApp";
import useFliprs from "./components/hooks/useFliprs";
import useUsers from "./components/hooks/useUsers";
import LoginApp from "./components/login/LoginApp";

export default function App(){

    const {fliprs, saveFlipr, deleteFlipr} = useFliprs();
    const {username, login} = useUsers();

    return (
        <BrowserRouter>
            <Container maxWidth={false} sx={{mt: 10}}>
                <Routes>
                    <Route path={"/"} element={<FliprApp deleteFlipr={deleteFlipr} saveFlipr={saveFlipr} username={username} fliprs={fliprs} />} />
                    <Route path={"/login"} element={<LoginApp login={login} />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );

}
