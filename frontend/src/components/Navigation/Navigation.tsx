import {Link} from "react-router-dom";

type NavigationProps = {
    logout: () => Promise<string>
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
                    <Link to={"/login"} className={"text-white text-decoration-none"}><i className="fa-solid fa-user"></i></Link>
                </div>
                <div className={"col text-start d-none d-md-block"}>
                    <Link to={"/login"} className={"text-white text-decoration-none"}>Login</Link>
                </div>
            </div>

            <div className={"row"}>
                <div className={"col text-white text-end"}>
                    <button className={"btn text-white text-decoration-none"} onClick={props.logout}><i className="fa-solid fa-user"></i></button>
                </div>
                <div className={"col text-start d-none d-md-block"}>
                    <button className={"btn text-white text-decoration-none"} onClick={props.logout}>Logout</button>
                </div>
            </div>

        </nav>
    );
}
export default Navigation