import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {InputAdornment, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PersonIcon from '@mui/icons-material/Person';
import {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {FliprUserDTO} from "../models/FliprUserDTO";
import Box from "@mui/material/Box";
import {wait} from "@testing-library/user-event/dist/utils";
import PasswordIcon from '@mui/icons-material/Password';
import FliprSnackBar from "../snackbar/FliprSnackBar";
import {AlertColor} from "@mui/material/Alert";
import {useNavigate} from "react-router";

type FliprLoginDialogProps = {
    open: boolean,
    handleClose: () => void,
    login: (userToLogin: FliprUserDTO) => Promise<unknown>,
    username: string,
}

export default function FliprLoginRegisterDialog(props: FliprLoginDialogProps) {

    const [showPassword, setShowPassword] = React.useState(false);
    const [userCredentials, setUserCredentials] = useState<FliprUserDTO>({
        username: "",
        password: "",
    });
    const [isError, setIsError] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [snackBarSeverity, setSnackBarSeverity] = useState<AlertColor | undefined>(undefined)
    const [snackBarMessage, setSnackBarMessage] = useState<string>("");

    const navigate = useNavigate();

    const handleOpenSnackBar = useCallback(() => {
        setOpenSnackBar(true);
    }, []);

    const handleCloseSnackbar = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    }, []);

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

    const handleLoginSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.login(userCredentials)
            .then(() => {
                setIsDisabled(true);
                setIsError(false);
                setSnackBarSeverity("success");
                setSnackBarMessage("Welcome back, " + props.username + " :)");
                handleOpenSnackBar();
                wait(3000)
                    .then(() => {
                        props.handleClose();
                        setUserCredentials({
                            username: "",
                            password: "",
                        });
                        navigate("/my-profile");
                    });
            })
            .catch((error) => {
               if(error.response.status === 401){
                   setIsDisabled(true);
                   setIsError(true);
                   setSnackBarSeverity("error");
                   setSnackBarMessage("Username and/or Password are wrong.");
                   handleOpenSnackBar();
                   wait(3000)
                       .then(() => {
                           setIsError(false);
                           setIsDisabled(false);
                           setUserCredentials({
                               username: "",
                               password: "",
                           });
                       });
               } 
            });
    }, [handleOpenSnackBar, navigate, props, userCredentials]);

    return (
        <Dialog open={props.open} onClose={props.handleClose} keepMounted={props.open}>
            <DialogTitle>Login</DialogTitle>
            <Box component={"form"} onSubmit={handleLoginSubmit}>
                <DialogContent>
                    <TextField
                        error={isError}
                        disabled={isDisabled}
                        label="Username"
                        id="outlined-start-adornment"
                        value={userCredentials.username}
                        onChange={handleChangeUserCredentials}
                        name={"username"}
                        fullWidth
                        sx={{m: 1}}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PersonIcon/></InputAdornment>,
                        }}
                    />
                    <TextField
                        error={isError}
                        disabled={isDisabled}
                        label="Password"
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={userCredentials.password}
                        onChange={handleChangeUserCredentials}
                        name={"password"}
                        fullWidth
                        sx={{m: 1}}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PasswordIcon/></InputAdornment>,
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type={"submit"}>Login</Button>
                </DialogActions>
                <FliprSnackBar open={openSnackBar} severity={snackBarSeverity} handleClose={handleCloseSnackbar}
                               message={snackBarMessage}/>
            </Box>
        </Dialog>
    );
}