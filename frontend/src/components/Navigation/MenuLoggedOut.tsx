import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import {useCallback} from "react";
import LoginRegisterDialog from "./LoginRegisterDialog";

type MenuLoggedOutProps = {
    open: boolean,
    handleLogin: (username: string, password: string) => void,
    handleRegister: (username: string, password: string) => void,
}

export default function MenuLoggedOut(props: MenuLoggedOutProps) {

    const [openLogin, setOpenLogin] = React.useState(false);
    const [openRegister, setOpenRegister] = React.useState(false);

    const handleClickOpen = useCallback(() => {
        setOpenLogin(true);
    }, [setOpenLogin]);

    const handleClose = useCallback(() => {
        setOpenLogin(false);
        setOpenRegister(false);
    }, [setOpenLogin, setOpenRegister]);

    const handleClickOpenRegister = useCallback(() => {
        setOpenRegister(true);
    }, [setOpenRegister]);

    return (
        <List>
            <ListItem key={"Login"} disablePadding sx={{display: 'block'}}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: props.open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                    onClick={handleClickOpen}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: props.open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <Tooltip title="Login" placement="right">
                            <LoginIcon/>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary={"Login"} sx={{opacity: props.open ? 1 : 0}}/>
                </ListItemButton>
                <LoginRegisterDialog openLogin={openLogin} openRegister={openRegister} handleClose={handleClose} handleLogin={props.handleLogin} handleRegister={props.handleRegister} />
            </ListItem>

            <ListItem key={"Register"} disablePadding sx={{display: 'block'}}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: props.open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                    onClick={handleClickOpenRegister}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: props.open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <Tooltip title="Register" placement="right">
                            <HowToRegIcon/>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary={"Register"} sx={{opacity: props.open ? 1 : 0}}/>
                </ListItemButton>
                <LoginRegisterDialog openLogin={openLogin} openRegister={openRegister} handleClose={handleClose} handleLogin={props.handleLogin} handleRegister={props.handleRegister} />
            </ListItem>
        </List>
    );
}