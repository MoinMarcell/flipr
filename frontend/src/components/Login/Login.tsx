import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type LoginProps = {
    login: (username: string, password: string) => Promise<string>
}

const Login = (props: LoginProps) => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    function onChangeUsername(event: ChangeEvent<HTMLInputElement>){
        setUsername(event.target.value);
    }

    function onChangePassword(event: ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }

    function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        props.login(username, password)
            .then(user => {
                navigate("/");
            });
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <div className="input-group mb-3">
                    <input type="text"
                           onChange={onChangeUsername}
                           className="form-control"
                           placeholder="Username"
                           aria-label="Username"
                           aria-describedby="basic-addon1"
                           value={username}/>
                </div>
                <div className="input-group mb-3">
                    <input type="password"
                           onChange={onChangePassword}
                           className="form-control"
                           placeholder="Password"
                           aria-label="Password"
                           aria-describedby="basic-addon1"
                           value={password}/>
                </div>
                <div>
                    <button type={"submit"} className={"btn btn-outline-secondary"}>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;