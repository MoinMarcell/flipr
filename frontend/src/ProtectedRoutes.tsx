import {Navigate, Outlet} from "react-router-dom";
import {FliprUserDTO} from "./components/models/FliprUserDTO";

type ProtectedRoutesProps = {
    username: string,
    login: (userToLogin: FliprUserDTO) => Promise<unknown>,
}

const ProtectedRoutes = (props: ProtectedRoutesProps) => {

    const isAuthenticated = props.username !== 'anonymousUser' && props.username !== undefined && props.username !== null;

    return (
        isAuthenticated
            ?
            <Outlet/>
            :
            <Navigate to={"/"} />
    );
}

export default ProtectedRoutes;