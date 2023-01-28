import * as React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FliprTopBar from "./components/appBar/FliprTopBar";
import useUsers from "./components/hooks/useUsers";
import UserProfile from "./components/profile/UserProfile";
import PublicProfile from "./components/profile/PublicProfile";
import ProtectedRoutes from "./ProtectedRoutes";
import useFliprs from "./components/hooks/useFliprs";
import FliprGallery from "./components/flipr/FliprGallery";
import FliprBottomBar from "./components/appBar/FliprBottomBar";
import FliprDetail from "./components/flipr/FliprDetail";

export default function App() {

    const {username, isAuthenticated, login, logout} = useUsers();
    const {fliprs, addFliprToFavorites, isLikedFlipr, deleteFlipr, saveFlipr} = useFliprs();

    return (
        <BrowserRouter>
            <FliprTopBar logout={logout} login={login} username={username} isAuthenticated={isAuthenticated}/>
            <Routes>
                <Route path={"/"}
                       element={<FliprGallery
                           saveFlipr={saveFlipr}
                           deleteFlipr={deleteFlipr}
                           isLikedFlipr={isLikedFlipr}
                           username={username}
                           isAuthenticated={isAuthenticated}
                           addFliprToFavorites={addFliprToFavorites}
                           fliprs={fliprs}
                       />}
                />
                <Route path={"/profiles/:username"}
                       element={<PublicProfile deleteFlipr={deleteFlipr}
                                               isLikedFlipr={isLikedFlipr}
                                               username={username}
                                               isAuthenticated={isAuthenticated}
                                               addFliprToFavorites={addFliprToFavorites}
                       />}
                />
                <Route path={"/flipr/:id"}
                       element={<FliprDetail username={username}
                                             isAuthenticated={isAuthenticated}
                                             addFliprToFavorites={addFliprToFavorites}
                                             isLikedFlipr={isLikedFlipr}
                                             deleteFlipr={deleteFlipr}
                       />}
                />
                <Route element={<ProtectedRoutes login={login} username={username}/>}>
                    <Route path={"/my-profile"} element={<UserProfile username={username}/>}/>
                </Route>
            </Routes>
            {
                isAuthenticated ?
                    <FliprBottomBar/> :
                    ''
            }
        </BrowserRouter>
    );

}
