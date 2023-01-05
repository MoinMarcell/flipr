import {Link} from "react-router-dom";

type NavigationProps = {
    logout: () => Promise<string>
    username: string
}

const Navigation = (props: NavigationProps) => {

    const isAuthenticated = props.username !== 'anonymousUser' && props.username !== undefined && props.username !== null;

    return(
        <nav className={"sticky-top"}>

            <div className={"row"}>
                <div className={"col text-white text-end"}>
                    <Link to={"/"} className={"text-white text-decoration-none"}><i className="fa-solid fa-terminal"></i></Link>
                </div>
                <div className={"col text-start d-none d-md-block"}>
                    <Link to={"/"} className={"text-white text-decoration-none"}>Home</Link>
                </div>
            </div>

            <div className={"row"}>
                <div className={"col text-white text-end"}>
                    {isAuthenticated ? <Link to={"/my-profile"} className={"text-white text-decoration-none"}><i className="fa-solid fa-user"></i></Link> : <Link to={"/login"} className={"text-white text-decoration-none"}><i className="fa-solid fa-user"></i></Link>}
                </div>
                <div className={"col text-start d-none d-md-block"}>
                    {isAuthenticated ? <Link to={"/my-profile"} className={"text-white text-decoration-none curso"}>Profile</Link> : <Link to={"/login"} className={"text-white text-decoration-none"}>Login</Link>}
                </div>
            </div>

            <div className={"row"}>
                <div className={"col text-white text-end"}>
                    {isAuthenticated ? <Link to={"/"} className={"text-white text-decoration-none"} onClick={props.logout}><i className="fa-solid fa-right-from-bracket"></i></Link> : ''}
                </div>
                <div className={"col text-start d-none d-md-block"}>
                    {isAuthenticated ? <Link to={"/"} className={"text-white text-decoration-none curso"} onClick={props.logout}>Logout</Link> : ''}
                </div>
            </div>

        </nav>
    );
}
export default Navigation