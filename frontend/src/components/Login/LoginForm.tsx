import DialogContentText from "@mui/material/DialogContentText";
import {Link} from "react-router-dom";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";
import {ChangeEvent, FormEvent, useState} from "react";
import Button from "@mui/material/Button";

type LoginFormProps = {
    handleClose: () => void,
    handleLogin: (username: string, password: string) => void,
    username: string,
}

export default function LoginForm(props: LoginFormProps) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function onChangeUsername(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.handleLogin(username, password);
        props.handleClose();
    }

    return (
        <DialogContent>
            <DialogContentText>
                You want to become a flipr? Click <Link to={"/register"} onClick={props.handleClose}>here</Link> to
                register!
            </DialogContentText>
            <form onSubmit={handleSubmit}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={username}
                    onChange={onChangeUsername}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={password}
                    onChange={onChangePassword}
                />
                <Button sx={{mt: 2, display: 'flex', alignSelf: 'self-end'}} type={"submit"}>Login</Button>
            </form>
        </DialogContent>
    );
}