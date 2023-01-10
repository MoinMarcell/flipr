import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import {Drawer, DrawerHeader} from "./NavigationGlobalSettings";
import MenuLoggedOut from "./MenuLoggedOut";
import Tooltip from "@mui/material/Tooltip";
import {useNavigate} from "react-router-dom";
import MenuLoggedIn from "./MenuLoggedIn";

type NavigationDrawerProps = {
    open: boolean,
    handleDrawerClose: () => void,
    theme: { direction: string; },
    username: string,
    handleLogin: (username: string, password: string) => void,
    handleLogout: () => void,
    handleRegister: (username: string, password: string) => void,
}

export default function NavigationDrawer(props: NavigationDrawerProps) {

    const navigate = useNavigate();

    return (
        <Drawer variant="permanent" open={props.open}>
            <DrawerHeader>
                <IconButton onClick={props.handleDrawerClose}>
                    {props.theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <List>
                <ListItem key={"Home"} disablePadding sx={{display: 'block'}}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: props.open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={() => navigate("/")}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: props.open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <Tooltip title="Home" placement="right">
                                <HomeIcon/>
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary={"Home"} sx={{opacity: props.open ? 1 : 0}}/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            {
                props.username && props.username !== 'anonymousUser' ?
                    <MenuLoggedIn open={props.open} handleLogout={props.handleLogout} /> :
                    <MenuLoggedOut handleRegister={props.handleRegister} open={props.open} handleLogin={props.handleLogin}/>
            }
        </Drawer>
    )
}