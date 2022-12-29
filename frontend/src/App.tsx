import "./app.css";
import Navigation from "./components/Navigation/Navigation";
import FliprsApp from "./components/Fliprs/FliprsApp";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";

const App = () => {
    return (
        <BrowserRouter>
            <div className={"container-xxl"}>
                <div className={"row"}>
                    <div className={"col text-center border-end border-light mt-2"}>
                        <Navigation/>
                    </div>
                    <div className={"col-10 mt-2"}>
                        <Routes>
                            <Route path={"/"} element={<FliprsApp />} />
                            <Route path={"/login"} element={<Login />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
