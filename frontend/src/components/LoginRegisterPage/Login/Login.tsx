import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type LoginProps = {
    login: (username: string, password: string) => Promise<string>
}

const Login = (props: LoginProps) => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    function onChangeUsername(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function onLoginSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.login(username, password)
            .then(user => {
                navigate("/");
            });
    }

    return (
        <div className="card h-100">
            <div className={"card-header"}>
                <h5 className={"card-title"}>Login</h5>
            </div>
            <div className="card-body">
                <form onSubmit={onLoginSubmit}>
                    <div className="form-floating mb-3">
                        <input onChange={onChangeUsername} value={username} type="text" className="form-control"
                               id="floatingInput" placeholder="Username"/>
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={onChangePassword} value={password} type="password" className="form-control" id="floatingInput" placeholder="Password"/>
                        <label htmlFor="floatingInput">Password</label>
                    </div>
                    <div>
                        <button type={"submit"} className={"btn btn-outline-secondary"}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;