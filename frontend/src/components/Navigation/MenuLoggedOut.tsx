import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import * as React from "react";
import Tooltip from "@mui/material/Tooltip";

type MenuLoggedOutProps = {
    open: boolean,
}

export default function MenuLoggedOut(props: MenuLoggedOutProps) {
    return (
        <List>
            <ListItem key={"Login"} disablePadding sx={{display: 'block'}}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: props.open ? 'initial' : 'center',
                        px: 2.5,
                    }}
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
            </ListItem>

            <ListItem key={"Register"} disablePadding sx={{display: 'block'}}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: props.open ? 'initial' : 'center',
                        px: 2.5,
                    }}
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
            </ListItem>
        </List>
    );
}