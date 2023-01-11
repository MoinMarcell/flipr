import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import {ChangeEvent, FormEvent, useCallback, useState} from "react";

type LoginDialogProps = {
    open: boolean,
    handleClose: () => void,
    handleOpenRegisterCloseLogin: () => void
    handleLogin: (username: string, password: string) => void,
}

export default function LoginDialog(props: LoginDialogProps) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onChangeUsername = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }, [setUsername]);

    const onChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, [setPassword]);

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.handleLogin(username, password);
        props.handleClose();
    }

    const onClickLogin = useCallback(() => {
        props.handleLogin(username, password);
        props.handleClose();
    }, [props, password, username]);

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>FLIPR<BubbleChartIcon/> LOGIN</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are new to FLIPR<BubbleChartIcon/>? Click <Button onClick={props.handleOpenRegisterCloseLogin}>here</Button> to register!
                </DialogContentText>
                <form onSubmit={onSubmit}>
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
                    <Button type={"submit"} sx={{display: 'none'}}></Button>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={onClickLogin}>Login</Button>
            </DialogActions>
        </Dialog>
    );
}