import "./app.css";
import Navigation from "./components/Navigation/Navigation";
import FliprsApp from "./components/Fliprs/FliprsApp";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginRegisterPage from "./components/LoginRegisterPage/LoginRegisterPage";
import useUser from "./components/Hooks/useUser";
import ProtectedRoutes from "./components/ProtectedRoutes";
import MyProfile from "./components/Profile/MyProfile";

const App = () => {

    const {username, login, logout, register, fliprUser} = useUser();

    return (
        <BrowserRouter>
            <div className={"container-xxl"}>
                <div className={"row"}>
                    <div className={"col-4 text-end border-end border-light mt-2"}>
                        <Navigation logout={logout} username={username}/>
                    </div>
                    <div className={"col-8 mt-2"}>
                        <h2 className={"text-white text-center"}><i className="fa-solid fa-terminal"></i> FLIPR</h2>
                        <Routes>
                            <Route path={"/"} element={<FliprsApp username={username} />} />
                            <Route path={"/login"} element={<LoginRegisterPage login={login} register={register} />} />

                            <Route element={<ProtectedRoutes username={username} />}>
                                <Route path={"/my-profile"} element={<MyProfile fliprUser={fliprUser} />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
