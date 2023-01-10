import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import LoginDialog from "../Login/LoginDialog";
import RegisterDialog from "../Register/RegisterDialog";

type MenuLoggedOutProps = {
    open: boolean,
    handleLogin: (username: string, password: string) => void,
    handleRegister: (username: string, password: string) => void,
}

export default function MenuLoggedOut(props: MenuLoggedOutProps) {

    const [openLogin, setOpenLogin] = React.useState(false);
    const [openRegister, setOpenRegister] = React.useState(false);

    const handleClickOpen = () => {
        setOpenLogin(true);
    };

    const handleClose = () => {
        setOpenLogin(false);
    };

    const handleClickOpenRegister = () => {
        setOpenRegister(true);
    };

    const handleCloseRegister = () => {
        setOpenRegister(false);
    };

    const handleOpenRegisterCloseLogin = () => {
        handleClose();
        handleClickOpenRegister();
    }

    const handleOpenLoginCloseRegister = () => {
        handleCloseRegister();
        handleClickOpen();
    }

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
                <LoginDialog handleOpenRegisterCloseLogin={handleOpenRegisterCloseLogin} open={openLogin} handleClose={handleClose} handleLogin={props.handleLogin} />
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
                <RegisterDialog handleOpenLoginCloseRegister={handleOpenLoginCloseRegister} open={openRegister} handleClose={handleCloseRegister} handleRegister={props.handleRegister} />
            </ListItem>
        </List>
    );
}