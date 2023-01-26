import * as React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FliprTopBar from "./components/appBar/FliprTopBar";
import useUsers from "./components/hooks/useUsers";
import UserProfile from "./components/profile/UserProfile";
import PublicProfile from "./components/profile/PublicProfile";
import ProtectedRoutes from "./ProtectedRoutes";

export default function App(){

    const {username, isAuthenticated, login, logout} = useUsers();

    return (
        <BrowserRouter>
            <FliprTopBar logout={logout} login={login} username={username} isAuthenticated={isAuthenticated} />
            <Routes>
                <Route path={"/:username"} element={<PublicProfile />} />
                <Route element={<ProtectedRoutes login={login} username={username} />}>
                    <Route path={"/my-profile"} element={<UserProfile username={username} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

}
