import React, {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {FliprUserDTO} from "../model/FliprUserDTO";
import {wait} from "@testing-library/user-event/dist/utils";
import {useNavigate} from "react-router-dom";
import {Alert, Box, Button, CircularProgress, Divider, Grid, Snackbar, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

type LoginAppProps = {
    login(userToLogin: FliprUserDTO): Promise<string>,
}

export default function LoginApp(props: LoginAppProps) {
    const [userToLogin, setUserToLogin] = useState<FliprUserDTO>({
        username: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [openSnackBarError, setOpenSnackBarError] = React.useState(false);
    const navigate = useNavigate();

    const handleOpenSnackBar = () => {
        setOpenSnackBar(true);
    };

    const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    const handleOpenSnackBarError = () => {
        setOpenSnackBarError(true);
    };

    const handleCloseSnackBarError = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBarError(false);
    };

    const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        setUserToLogin({
            ...userToLogin,
            [name]: event.target.value,
        });
    }, [userToLogin])

    const handleSubmitLogin = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        props.login(userToLogin)
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
    }, [navigate, props, userToLogin]);

    const handleRegisterClick = useCallback(() => {
        navigate("/register");
    }, [navigate])

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={8}>
                    <Typography variant={"h4"} align={"center"} sx={{mb: 1}}>You do not have an Account?</Typography>
                    <Typography align={"center"} paragraph>
                        If you have no Account, you can click the button ro register.
                    </Typography>
                    <Box textAlign={"center"}>
                        <Button variant={"outlined"} onClick={handleRegisterClick} sx={{mb: 2}}>REGISTER HERE</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant={"h4"} align={"center"} sx={{mb: 1}}>Login</Typography>
                    <Box component={"form"} onSubmit={handleSubmitLogin}>
                        <Stack
                            direction="column"
                            divider={<Divider orientation="horizontal" flexItem/>}
                            spacing={2}
                        >
                            <TextField name={"username"} value={userToLogin.username} onChange={handleChangeInput}
                                       id="username-register" label="Username" variant="outlined"/>
                            <TextField type={"password"} name={"password"} value={userToLogin.password}
                                       onChange={handleChangeInput} id="password-register" label="Password"
                                       variant="outlined"/>
                        </Stack>
                        {
                            !isLoading ?
                                <Button type={"submit"} variant={"outlined"} sx={{mr: 2, mt: 2}}>LOGIN NOW!</Button> :
                                <Button variant={"outlined"} sx={{mr: 2, mt: 2}} disabled><CircularProgress size={25} /></Button>
                        }
                        <Button type={"reset"} variant={"outlined"} sx={{mr: 2, mt: 2}}>RESET</Button>
                    </Box>
                    <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                        <Alert onClose={handleCloseSnackBar} severity="success" sx={{width: '100%'}}>
                            Registration Successfully!
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