import {FliprUserDTO} from "../model/FliprUserDTO";
import React, {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {Alert, AlertColor, Box, Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {wait} from "@testing-library/user-event/dist/utils";
import Snackbar, {SnackbarOrigin} from '@mui/material/Snackbar';

export interface State extends SnackbarOrigin {
    open: boolean;
}

type LoginAppProps = {
    login(userToLogin: FliprUserDTO): Promise<string>,
}

export default function LoginApp(props: LoginAppProps) {

    const [userCredentials, setUserCredentials] = useState<FliprUserDTO>({
        username: "",
        password: "",
    });
    const [isErrorTextfield, setIsErrorTextfield] = useState<boolean>(false);
    const [isDisabledComponent, setIsDisabledComponent] = useState<boolean>(false);
    const [snackBarText, setSnackBarText] = useState<string>("");
    const [snackBarseverity, setSnackBarseverity] = useState<AlertColor | undefined>("error");
    const [openSnackBar, setOpenSnackBar] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const {vertical, horizontal, open} = openSnackBar;

    const handleOpenSnackBar = (newState: SnackbarOrigin) => {
        setOpenSnackBar({open: true, ...newState});
    };

    const handleCloseSnackBar = useCallback(() => {
        setOpenSnackBar({...openSnackBar, open: false});
    }, [openSnackBar]);

    const navigate = useNavigate();

    const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        setUserCredentials({
            ...userCredentials,
            [name]: event.target.value,
        });
    }, [userCredentials]);

    const handleSubmitLogin = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.login(userCredentials)
            .then(() => {
                setIsDisabledComponent(true);
                setSnackBarText("LoggedIn successfully. You will be redirected soon!");
                setSnackBarseverity("success");
                handleOpenSnackBar({
                    vertical: 'top',
                    horizontal: 'right',
                });
                wait(1500).then(() => {
                    navigate("/");
                    setUserCredentials({
                        ...userCredentials,
                        username: "",
                        password: "",
                    });
                });
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setIsDisabledComponent(true);
                    setSnackBarText("Username and/or Password wrong!");
                    handleOpenSnackBar({
                        vertical: 'top',
                        horizontal: 'right',
                    });
                    setIsErrorTextfield(true);
                    wait(1500)
                        .then(() => {
                            setIsDisabledComponent(false);
                            setIsErrorTextfield(false);
                            setUserCredentials({
                                ...userCredentials,
                                username: "",
                                password: "",
                            });
                            handleCloseSnackBar();
                        });
                } else {
                    setIsDisabledComponent(true);
                    setSnackBarText("Something went wrong. Try again later!");
                    handleOpenSnackBar({
                        vertical: 'top',
                        horizontal: 'right',
                    });
                    setIsErrorTextfield(true);
                    wait(1500)
                        .then(() => {
                            setIsDisabledComponent(false);
                            setIsErrorTextfield(false);
                            setUserCredentials({
                                ...userCredentials,
                                username: "",
                                password: "",
                            });
                            handleCloseSnackBar();
                        });
                }
            });
    }, [handleCloseSnackBar, navigate, props, userCredentials]);

    return (
        <Box
            component={"form"}
            onSubmit={handleSubmitLogin}
        >

            <TextField
                name={"username"}
                type={"text"}
                value={userCredentials.username}
                onChange={handleChangeInput}
                id="username"
                label="Username"
                variant="filled"
                error={isErrorTextfield}
                disabled={isDisabledComponent}
            />
            <TextField
                name={"password"}
                type={"password"}
                value={userCredentials.password}
                onChange={handleChangeInput}
                id="filled-basic"
                label="Password"
                variant="filled"
                error={isErrorTextfield}
                disabled={isDisabledComponent}
            />

            <Button
                type={"submit"}
                variant={"outlined"}
                disabled={isDisabledComponent}
            >
                LOGIN
            </Button>

            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                open={open}
                onClose={handleCloseSnackBar}
                key={vertical + horizontal}
            >
                <Alert onClose={handleCloseSnackBar} severity={snackBarseverity} sx={{width: '100%'}}>
                    {snackBarText}
                </Alert>
            </Snackbar>

        </Box>
    );

}
