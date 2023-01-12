import * as React from "react";
import Box from "@mui/material/Box";
import {DrawerHeader} from "./components/Navigation/NavigationGlobalSettings";
import NavigationApp from "./components/Navigation/NavigationApp";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FliprApp from "./components/Flipr/FliprApp";
import useFliprs from "./components/Hooks/useFliprs";
import useUser from "./components/Hooks/useUser";
import AddFlipr from "./components/Flipr/AddFlipr";
import FliprDetails from "./components/Flipr/FliprDetails";
import {useCallback, useState} from "react";

const App = () => {

    const {fliprs, deleteFlipr, saveFlipr} = useFliprs();
    const {username, login, logout, register} = useUser();
    const [searchText, setSearchText] = useState<string>("")
    const handleSearchText = useCallback((searchTextToHandle: string) => {
        setSearchText(searchTextToHandle);
    }, [setSearchText]);

    return (
        <Box sx={{display: 'flex'}}>
            <BrowserRouter>
                <NavigationApp handleSearchText={handleSearchText} username={username} handleLogin={login} handleLogout={logout} handleRegister={register}/>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <DrawerHeader/>
                    <AddFlipr handleSubmit={saveFlipr} username={username} />
                    <Routes>
                        <Route path={"/"} element={<FliprApp searchText={searchText} fliprs={fliprs} username={username} handleDelete={deleteFlipr}/>}/>
                        <Route path={"/flipr/:id"} element={<FliprDetails username={username} handleDelete={deleteFlipr} />} />
                        <Route path={"/user/:username"} element={<FliprApp searchText={searchText} fliprs={fliprs} username={username} handleDelete={deleteFlipr} />} />
                    </Routes>
                </Box>
            </BrowserRouter>
        </Box>
    );

}

export default App;
