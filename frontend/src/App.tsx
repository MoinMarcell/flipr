import NavigationBar from "./components/AppBar/NavigationBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Container from "@mui/material/Container";
import Register from "./components/Register/Register";
import FliprApp from "./components/Flipr/FliprApp";
import AddFlipr from "./components/Flipr/AddFlipr";
import Profile from "./components/Profile/Profile";
import useUser from "./components/Hooks/useUser";
import useFliprs from "./components/Hooks/useFliprs";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {

    const {username, login, logout} = useUser();
    const {fliprs, saveFlipr, deleteFlipr} = useFliprs();

    return (
        <BrowserRouter>
            <NavigationBar handleLogout={logout} handleLogin={login} username={username}/>
            <Container sx={{mt: 10}}>
                <AddFlipr handleSubmit={saveFlipr} username={username}/>
                <Routes>
                    <Route path={"/"}
                           element={<FliprApp fliprs={fliprs} username={username} handleDelete={deleteFlipr}/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route element={<ProtectedRoutes username={username} />}>
                        <Route path={"/profile"}
                               element={<Profile username={username} fliprs={fliprs} handleDelete={deleteFlipr}/>}/>
                    </Route>
                </Routes>
            </Container>
        </BrowserRouter>
    );

}

export default App;
