import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import * as React from "react";
import Tooltip from "@mui/material/Tooltip";

type MenuLoggedOutProps = {
    open: boolean,
    handleLogout: () => void,
}

export default function MenuLoggedIn(props: MenuLoggedOutProps) {

    return (
        <List>
            <ListItem key={"Logout"} disablePadding sx={{display: 'block'}}>
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