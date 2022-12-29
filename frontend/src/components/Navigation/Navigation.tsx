const Navigation = () => {
    return(
        <nav className={"mt-3"}>

            <div className={"row"}>
                <div className={"col text-white text-end"}>
                    <i className="fa-solid fa-terminal"></i>
                </div>
                <div className={"col text-start"}>
                    <a href={"#"}>Home</a>
                </div>
            </div>

            <div className={"row"}>
                <div className={"col text-white text-end"}>
                    <i className="fa-solid fa-hashtag"></i>
                </div>
                <div className={"col text-start"}>
                    <a href={"#"}>Discover</a>
                </div>
            </div>

            <div className={"row"}>
                <div className={"col text-white text-end"}>
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className={"col text-start"}>
                    <a href={"#"}>Login</a>
                </div>
            </div>

        </nav>
    );
}
export default Navigation