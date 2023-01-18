import {Alert, Box, Button, CircularProgress, Divider, Grid, Snackbar, Stack, TextField} from "@mui/material";
import React, {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import {FliprUserDTO} from "./model/FliprUserDTO";
import {wait} from "@testing-library/user-event/dist/utils";

type RegisterProps = {
    register(userToRegister: FliprUserDTO): Promise<FliprUserDTO>,
    isLoading: boolean,
}

export default function Register(props: RegisterProps) {

    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [openSnackBarError, setOpenSnackBarError] = React.useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userToSave, setUserToSave] = useState<FliprUserDTO>({
        username: "",
        password: ""
    })
    const navigate = useNavigate();

    const showLabelError: boolean = userToSave.username.length === 0 ?
        false :
        userToSave.username.length < 4 ;

    const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        setUserToSave({
            ...userToSave,
            [name]: event.target.value
        })
    }, [userToSave])

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
    },[setOpenSnackBarError]);

    const handleSubmitRegister = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        props.register(userToSave)
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
    }, [props, userToSave, navigate, handleOpenSnackBar, handleOpenSnackBarError]);

    const handleLoginClick = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    return (
        <Box>
            <Grid
                container
            >
                <Grid item xs={12} md={8} alignItems={"flex-start"}>
                    <Typography variant={"h4"} align={"center"} sx={{mb: 1}}>Already registered?</Typography>
                    <Typography align={"center"} paragraph>
                        If you already have an Account, you can click the button to login.
                    </Typography>
                    <Box textAlign={"center"}>
                        <Button variant={"outlined"} onClick={handleLoginClick} sx={{mb: 2}}>LOGIN HERE</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant={"h4"} align={"center"} sx={{mb: 1}}>Register</Typography>
                    <Box component={"form"} onSubmit={handleSubmitRegister}>
                        <Stack
                            direction="column"
                            divider={<Divider orientation="horizontal" flexItem/>}
                            spacing={2}
                        >
                            <TextField name={"username"} value={userToSave.username} onChange={handleChangeInput}
                                       id="username-register" label="Username" variant="outlined" error={showLabelError}/>
                            <TextField type={"password"} name={"password"} value={userToSave.password}
                                       onChange={handleChangeInput} id="password-register" label="Password"
                                       variant="outlined"/>
                        </Stack>
                        <Box sx={{mt: 2}}>
                            {
                                !isLoading ?
                                <Button type={"submit"} variant={"outlined"} sx={{mr: 2}}>REGISTER NOW!</Button> :
                                <Button variant={"outlined"} sx={{mr: 2}} disabled><CircularProgress size={25} /></Button>
                            }
                            <Button type={"reset"} variant={"outlined"}>RESET</Button>
                        </Box>
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
        </Box>
    );
}