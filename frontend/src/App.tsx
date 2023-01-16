import * as React from "react";
import FliprApp from "./components/Flipr/FliprApp";
import LoginForm from "./components/LoginForm";
import useUsers from "./components/hooks/useUsers";
import {Box, Container} from "@mui/material";
import NavBar from "./components/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {

    const {username, login, logout} = useUsers();

    return (
        <Box>
            <BrowserRouter>
                <NavBar username={username} logout={logout}/>
                <Container maxWidth={false} sx={{mt: 2}}>
                    <Routes>
                        <Route path={"/"} element={<FliprApp username={username}/>}/>
                        <Route path={"/login"} element={<LoginForm username={username} login={login}/>}/>
                    </Routes>
                </Container>
            </BrowserRouter>
        </Box>
    )
        ;

}

export default App;
