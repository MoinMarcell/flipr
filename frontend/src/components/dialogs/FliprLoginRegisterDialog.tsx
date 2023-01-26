import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {FormControl, Input, InputAdornment, InputLabel} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import {ChangeEvent, useCallback, useState} from "react";
import {FliprUserDTO} from "../models/FliprUserDTO";
import Box from "@mui/material/Box";

type FliprLoginDialogProps = {
    open: boolean,
    handleClose: () => void,
    login: (userToLogin: FliprUserDTO) => Promise<unknown>,
}

export default function FliprLoginRegisterDialog(props: FliprLoginDialogProps) {

    const [showPassword, setShowPassword] = React.useState(false);
    const [userCredentials, setUserCredentials] = useState<FliprUserDTO>({
        username: "",
        password: "",
    });

    const handleClickShowPassword = useCallback(() => {
        setShowPassword((show) => !show)
    }, []);

    const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }, []);

    const handleChangeUserCredentials = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        setUserCredentials({
            ...userCredentials,
            [name]: event.target.value,
        });
    }, [userCredentials]);

    const handleLoginSubmit = useCallback(() => {
        props.login(userCredentials)
            .then(() => {
                props.handleClose();
            })
            .catch()
    }, [props, userCredentials]);

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <Box component={"form"} onSubmit={handleLoginSubmit}>
                    <FormControl fullWidth sx={{m: 1}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-username">Username</InputLabel>
                        <Input
                            id="standard-adornment-username"
                            value={userCredentials.username}
                            name="username"
                            onChange={handleChangeUserCredentials}
                            startAdornment={<InputAdornment position="start"><PersonIcon/></InputAdornment>}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{m: 1}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Username</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={userCredentials.password}
                            name="password"
                            onChange={handleChangeUserCredentials}
                            startAdornment={<InputAdornment position="start"><PasswordIcon/></InputAdornment>}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={handleLoginSubmit}>Login</Button>
            </DialogActions>
        </Dialog>
    );
}