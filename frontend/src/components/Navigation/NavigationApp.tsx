import {CssBaseline} from "@mui/material";
import NavigationAppBar from "./NavigationAppBar";
import NavigationDrawer from "./NavigationDrawer";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {useCallback} from "react";

type NavigationAppProps = {
    username: string,
    handleLogin: (username: string, password: string) => void,
    handleRegister: (username: string, password: string) => void,
    handleLogout: () => void,
    handleSearchText: (searchText: string) => void,
}

export default function NavigationApp(props: NavigationAppProps) {

    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const handleDrawerOpen = useCallback(() => {
        setOpenDrawer(true);
    }, [setOpenDrawer]);

    const handleDrawerClose = useCallback(() => {
        setOpenDrawer(false);
    }, [setOpenDrawer]);

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <NavigationAppBar handleSearchText={props.handleSearchText} open={openDrawer} handleDrawerOpen={handleDrawerOpen}/>
            <NavigationDrawer handleRegister={props.handleRegister} handleLogout={props.handleLogout} handleLogin={props.handleLogin} open={openDrawer} handleDrawerClose={handleDrawerClose} theme={theme} username={props.username}/>
        </Box>
    );
}