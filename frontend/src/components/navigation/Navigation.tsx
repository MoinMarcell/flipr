import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";

type NavigationProps = {
    username: string,
    logout(): Promise<string>,
}

function Navigation(props: NavigationProps) {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleOpenNavMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    },[]);
    const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    }, []);

    const handleCloseNavMenu = useCallback(() => {
        setAnchorElNav(null);
    }, []);

    const handleCloseUserMenu = useCallback(() => {
        setAnchorElUser(null);
    }, []);

    const handleLogout = useCallback(() => {
        props.logout()
            .then()
            .catch();
    }, [props]);

    const handleLoginClick = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    const handleHomeClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor: 'pointer' }} onClick={handleHomeClick} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={handleHomeClick}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex', cursor: 'pointer' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        FLIPR
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                                <MenuItem key={'Home'} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" onClick={handleHomeClick}>Home</Typography>
                                </MenuItem>
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, cursor: 'pointer' }} onClick={handleHomeClick} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={handleHomeClick}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none', cursor: 'pointer' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        FLIPR
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                key={"Home"}
                                onClick={handleHomeClick}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Home
                            </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {
                                props.username && props.username !== 'anonymousUser' ?
                                    <MenuItem key={"Logout"} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={handleLogout}>Logout</Typography>
                                    </MenuItem> :
                                    <MenuItem key={"Login"} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={handleLoginClick}>Login</Typography>
                                    </MenuItem>
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navigation;