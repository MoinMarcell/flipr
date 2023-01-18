import * as React from "react";
import FliprApp from "./components/Flipr/FliprApp";
import useUsers from "./components/hooks/useUsers";
import {Box, Container} from "@mui/material";
import NavBarApp from "./components/NavBar/NavBarApp";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./components/Register";
import PublicProfile from "./components/FliprUser/PublicProfile";
import LoginApp from "./components/login/LoginApp";

const App = () => {

    const {username, login, logout, saveUser, isLoading} = useUsers();

    return (
        <Box>
            <BrowserRouter>
                <NavBarApp username={username} logout={logout}/>
                <Container maxWidth={false} sx={{mt: 2}}>
                    <Routes>
                        <Route path={"/"} element={<FliprApp username={username}/>}/>
                        <Route path={"/login"} element={<LoginApp login={login}/>}/>
                        <Route path={"/register"} element={<Register register={saveUser} isLoading={isLoading} />} />
                        <Route path={"/:username"} element={<PublicProfile />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </Box>
    )
        ;

}

export default App;
