import React, {useState, ChangeEvent, FormEvent} from 'react';
import {useNavigate} from "react-router-dom";

type RegisterProps = {
    register: (username: string, email: string, password: string) => void
}


const Register = (props: RegisterProps) => {

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigation = useNavigate();

    function onChangeUsername(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function onChangeEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function onRegisterSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.register(username, email, password);
        setUsername("");
        setPassword("");
        setEmail("");
        navigation("/")
    }

    return (
        <div className="card h-100">
            <div className={"card-header"}>
                <h5 className={"card-title"}>Register</h5>
            </div>
            <div className="card-body">
                <form onSubmit={onRegisterSubmit}>
                    <div className="form-floating mb-3">
                        {username.length >= 1 ?
                            <input onChange={onChangeUsername}
                                   value={username}
                                   type="text"
                                   className="form-control"
                                   id="floatingInput"
                                   placeholder="Username"/> :
                            <input type="test"
                                   onChange={onChangeUsername}
                                   className="form-control is-invalid"
                                   id="floatingInputInvalid"
                                   placeholder="Username"
                                   value={username} />
                        }
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        {email.length < 5 || !email.includes('@') ?
                            <input onChange={onChangeEmail}
                                   value={email}
                                   type="email"
                                   className="form-control is-invalid"
                                   id="floatingInputInvalid"
                                   placeholder="Email"/> :
                            <input onChange={onChangeEmail}
                                   value={email}
                                   type="email"
                                   className="form-control"
                                   id="floatingInput"
                                   placeholder="Email"/>
                        }
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        {password.length < 8 || !password.includes('#') ?
                            <input onChange={onChangePassword}
                                   value={password}
                                   type="password"
                                   className="form-control is-invalid"
                                   id="floatingInputInvalid"
                                   placeholder="Password"/> :
                            <input onChange={onChangePassword}
                                   value={password}
                                   type="password"
                                   className="form-control"
                                   id="floatingInput"
                                   placeholder="Password"/>
                        }
                        <label htmlFor="floatingInput">Password</label>
                        <div>
                            <p>Needs at least 8 or more Characters and minimum one special Character (#).</p>
                        </div>
                    </div>
                    <div>
                        <button type={"submit"} className={"btn btn-outline-secondary"}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Register;