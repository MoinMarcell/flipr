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
    handleRegister: (username: string, password: string) => void,
    handleOpenLoginCloseRegister: () => void,
}

export default function RegisterDialog(props: LoginDialogProps) {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const onChangeUsername = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }, [setUsername]);

    const onChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, [setPassword]);

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.handleRegister(username, password);
        props.handleClose();
    }

    const onClickLogin = useCallback(() => {
        props.handleRegister(username, password);
        props.handleClose();
    }, [props, username, password])

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>FLIPR<BubbleChartIcon/> Register</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Already a FLIPR<BubbleChartIcon/>? Click <Button onClick={props.handleOpenLoginCloseRegister}>here</Button> to Login!
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
                <Button onClick={onClickLogin}>Register</Button>
            </DialogActions>
        </Dialog>
    );
}