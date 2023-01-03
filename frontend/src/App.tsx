import "./app.css";
import Navigation from "./components/Navigation/Navigation";
import FliprsApp from "./components/Fliprs/FliprsApp";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import useUser from "./components/Hooks/useUser";

const App = () => {

    const {username, login, logout} = useUser();

    return (
        <BrowserRouter>
            <div className={"container-xxl"}>
                <div className={"row"}>
                    <div className={"col text-center border-end border-light mt-2"}>
                        <Navigation logout={logout}/>
                        <h2 className={"text-white"}>Hello, {username}</h2>
                    </div>
                    <div className={"col-10 mt-2"}>
                        <h2 className={"text-white text-center"}><i className="fa-solid fa-terminal"></i> FLIPR</h2>
                        <Routes>
                            <Route path={"/"} element={<FliprsApp />} />
                            <Route path={"/login"} element={<Login login={login} />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
