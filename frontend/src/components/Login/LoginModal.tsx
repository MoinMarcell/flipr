import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import AdbIcon from '@mui/icons-material/Adb';
import LoginForm from "./LoginForm";

type LoginModalProps = {
    open: boolean,
    handleClose: () => void,
    handleLogin: (username: string, password: string) => void,
    username: string
}

export default function LoginModal(props: LoginModalProps) {

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle><AdbIcon /> Login</DialogTitle>
            <LoginForm handleLogin={props.handleLogin} handleClose={props.handleClose} username={props.username}/>
        </Dialog>
    );
}