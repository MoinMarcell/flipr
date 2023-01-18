import React, {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {FliprUserDTO} from "../model/FliprUserDTO";
import {wait} from "@testing-library/user-event/dist/utils";
import {useLocation, useNavigate} from "react-router-dom";
import {Alert, Box, Button, CircularProgress, Divider, Grid, Snackbar, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

type LoginAppProps = {
    login(userToLogin: FliprUserDTO): Promise<string>,
    register(userToRegister: FliprUserDTO): Promise<FliprUserDTO>,
}

export default function LoginRegisterApp(props: LoginAppProps) {
    const [user, setUser] = useState<FliprUserDTO>({
        username: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [openSnackBarError, setOpenSnackBarError] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const isLocationLogin = location === "/login";

    const handleOpenSnackBar = useCallback(() => {
        setOpenSnackBar(true);
    }, [setOpenSnackBar]);

    const handleCloseSnackBar = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    }, [setOpenSnackBar]);

    const handleOpenSnackBarError = useCallback(() => {
        setOpenSnackBarError(true);
    }, [setOpenSnackBarError]);

    const handleCloseSnackBarError = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBarError(false);
    }, [setOpenSnackBarError]);

    const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        setUser({
            ...user,
            [name]: event.target.value,
        });
    }, [user])

    const handleSubmitLogin = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        props.login(user)
            .then(() => {
                handleOpenSnackBar();
                wait(1500).then(() => {
                    setIsLoading(false);
                    navigate("/");
                })
            })
            .catch(() => {
                handleOpenSnackBarError();
                wait(1500).then(() => {
                    setIsLoading(false);
                })
            });
    }, [navigate, props, user, handleOpenSnackBarError, handleOpenSnackBar]);

    const handleSubmitRegister = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        props.register(user)
            .then(() => {
                handleOpenSnackBar();
                wait(1500).then(() => {
                    setIsLoading(false);
                    navigate("/login");
                });
            })
            .catch(() => {
                handleOpenSnackBarError();
                wait(1500).then(() => {
                    setIsLoading(false);
                })
            })
    }, [props, user, navigate, handleOpenSnackBar, handleOpenSnackBarError]);

    const handleRegisterClick = useCallback(() => {
        navigate("/register");
    }, [navigate]);

    const handleLoginClick = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={8}>
                    <Typography variant={"h4"} align={"center"} sx={{mb: 1}}>
                        {
                            isLocationLogin ?
                                "You do not have an Account?":
                                "Already registered?"
                        }
                    </Typography>
                    <Typography align={"center"} paragraph>
                        {
                            isLocationLogin ?
                                "If you have no Account, you can click the button ro register." :
                                "If you already have an Account, you can click the button to login."
                        }
                    </Typography>
                    <Box textAlign={"center"}>
                        {
                            isLocationLogin ?
                                <Button variant={"outlined"} onClick={handleRegisterClick} sx={{mb: 2}}>REGISTER HERE</Button> :
                                <Button variant={"outlined"} onClick={handleLoginClick} sx={{mb: 2}}>LOGIN HERE</Button>
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant={"h4"} align={"center"} sx={{mb: 1}}>
                        {
                            isLocationLogin ?
                                "Login":
                                "Register"
                        }
                    </Typography>
                    <Box component={"form"} onSubmit={isLocationLogin ? handleSubmitLogin : handleSubmitRegister}>
                        <Stack
                            direction="column"
                            divider={<Divider orientation="horizontal" flexItem/>}
                            spacing={2}
                        >
                            <TextField name={"username"} value={user.username} onChange={handleChangeInput}
                                       id="username-register" label="Username" variant="outlined"/>
                            <TextField type={"password"} name={"password"} value={user.password}
                                       onChange={handleChangeInput} id="password-register" label="Password"
                                       variant="outlined"/>
                        </Stack>
                        {
                            !isLoading ?
                                <Button type={"submit"} variant={"outlined"} sx={{mr: 2, mt: 2}}>
                                    {
                                        isLocationLogin ? "LOGIN NOW!" : "REGISTER NOW!"
                                    }
                                </Button> :
                                <Button variant={"outlined"} sx={{mr: 2, mt: 2}} disabled><CircularProgress size={25} /></Button>
                        }
                        <Button type={"reset"} variant={"outlined"} sx={{mr: 2, mt: 2}}>RESET</Button>
                    </Box>
                    <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                        <Alert onClose={handleCloseSnackBar} severity="success" sx={{width: '100%'}}>
                            {
                                isLocationLogin ? "Login Successfully!" : "Registration Successfully!"
                            }
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openSnackBarError} autoHideDuration={6000} onClose={handleCloseSnackBarError}>
                        <Alert onClose={handleCloseSnackBarError} severity="error" sx={{width: '100%'}}>
                            Something went wrong!
                        </Alert>
                    </Snackbar>
                </Grid>
            </Grid>

            <Divider orientation={"horizontal"} sx={{mt: 2, mb: 2}} flexItem/>
            <Box textAlign={"center"}>
                <Typography variant={"h1"}>
                    FLIPR<BubbleChartIcon sx={{fontSize: 100}}/>
                </Typography>
            </Box>
        </div>
    )
        ;
}