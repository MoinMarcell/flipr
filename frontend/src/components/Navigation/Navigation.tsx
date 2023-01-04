import {Link} from "react-router-dom";

type NavigationProps = {
    logout: () => Promise<string>
    username: string
}

const Navigation = (props: NavigationProps) => {

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
                    {props.username === 'anonymousUser' ? <Link to={"/login"} className={"text-white text-decoration-none"}><i className="fa-solid fa-user"></i></Link> : <span className={"text-white text-decoration-none"} onClick={props.logout}><i className="fa-solid fa-user"></i></span>}
                </div>
                <div className={"col text-start d-none d-md-block"}>
                    {props.username === 'anonymousUser' ? <Link to={"/login"} className={"text-white text-decoration-none"}>Login</Link> : <span className={"text-white text-decoration-none curso"} onClick={props.logout}>{props.username}</span>}
                </div>
            </div>

        </nav>
    );
}
export default Navigation