import {Navigate, Outlet} from "react-router-dom";

type ProtectedRoutesProps = {
    username: string,
}

const ProtectedRoutes = (props: ProtectedRoutesProps) => {

    const isAuthenticated = props.username !== 'anonymousUser' && props.username !== undefined && props.username !== null;

    return (
        isAuthenticated ? <Outlet /> : <Navigate to={"/register"} />
    );
}

export default ProtectedRoutes;