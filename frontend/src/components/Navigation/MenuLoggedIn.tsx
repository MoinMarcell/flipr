import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from '@mui/icons-material/Person';
import {useCallback} from "react";
import {useNavigate} from "react-router-dom";

type MenuLoggedOutProps = {
    open: boolean,
    handleLogout: () => void,
}

export default function MenuLoggedIn(props: MenuLoggedOutProps) {

    const navigate = useNavigate();

    const onClickMyProfile = useCallback(() => {
        navigate("/profile")
    }, [navigate]);

    return (
        <List>
            <ListItem key={"My Profile"} disablePadding sx={{display: 'block'}}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: props.open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                    onClick={onClickMyProfile}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: props.open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <Tooltip title="My Profile" placement="right">
                            <PersonIcon/>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary={"My Profile"} sx={{opacity: props.open ? 1 : 0}}/>
                </ListItemButton>

                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: props.open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                    onClick={props.handleLogout}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: props.open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <Tooltip title="Logout" placement="right">
                            <LogoutIcon/>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary={"Logout"} sx={{opacity: props.open ? 1 : 0}}/>
                </ListItemButton>
            </ListItem>
        </List>
    );
}