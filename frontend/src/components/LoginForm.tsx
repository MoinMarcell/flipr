import {Alert, Box, Button, Snackbar, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useCallback, useState} from "react";

type LoginFormProps = {
    username: string,
    login: (username: string, password: string) => Promise<string>,
}

export default function LoginForm(props: LoginFormProps) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const handleCloseSnackbar = useCallback(() => {
        setOpenSnackbar(false);
    }, []);

    const handleChangeUsername = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }, []);

    const handleChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const handleSubmitLogin = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await props.login(username, password)
            .then((data) => {
                setOpenSnackbar(true);
                return data;
            });
        setOpenSnackbar(true);
    }, [password, props, username])

    return (
        <Box component={"form"} onSubmit={handleSubmitLogin}>
            <TextField id="outlined-basic" label="Username" variant="outlined" type={"text"} value={username}
                       onChange={handleChangeUsername}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" type={"password"} value={password}
                       onChange={handleChangePassword}/>
            <Button type={"submit"}>LOGIN</Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>
                    LoggedIn successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}