import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Tooltip} from "@mui/material";
import NavBarSearchInput from "./NavBarSearchInput";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

type NavBarProps = {
    username: string,
    logout: () => Promise<string>,
}

const pages = ['Home'];

export default function NavBarApp(props: NavBarProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, [setAnchorEl]);

    const handleMobileMenuClose = useCallback(() => {
        setMobileMoreAnchorEl(null);
    }, [setMobileMoreAnchorEl]);

    const handleMenuClose = useCallback(() => {
        setAnchorEl(null);
        handleMobileMenuClose();
    }, [handleMobileMenuClose]);

    const handleMobileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    }, [setMobileMoreAnchorEl]);

    const handleLoginClick = useCallback(() => {
        navigate("/login");
        handleMenuClose();
    }, [navigate, handleMenuClose]);

    const handleRegisterClick = useCallback(() => {
        navigate("/register");
        handleMenuClose();
    }, [navigate, handleMenuClose]);

    const handleLogout = useCallback(async () => {
        await props.logout().then(() => {
            navigate("/");
        });
        handleMenuClose()
    }, [handleMenuClose, navigate, props])

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {
                props.username && props.username !== 'anonymousUser' ?
                    <MenuItem onClick={handleLogout}>Logout</MenuItem> :
                    <div>
                        <MenuItem onClick={handleLoginClick}>Login</MenuItem>
                        <MenuItem onClick={handleRegisterClick}>Register</MenuItem>
                    </div>
            }
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            {
                props.username && props.username !== 'anonymousUser' ?
                    <MenuItem onClick={handleLogout}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <LogoutRoundedIcon/>
                        </IconButton>
                        <p>Logout</p>
                    </MenuItem> :
                    <div>
                        <MenuItem onClick={handleLoginClick}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <LoginIcon/>
                            </IconButton>
                            <p>Login</p>
                        </MenuItem>
                        <MenuItem onClick={handleRegisterClick}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <HowToRegRoundedIcon/>
                            </IconButton>
                            <p>Register</p>
                        </MenuItem>
                    </div>
            }
        </Menu>
    );

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    }, [setAnchorElNav]);

    const handleCloseNavMenu = useCallback(() => {
        setAnchorElNav(null);
        navigate("/");
    },[navigate, setAnchorElNav]);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <BubbleChartIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        FLIPR
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
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
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <BubbleChartIcon onClick={() => navigate("/")} sx={{display: {xs: 'flex', md: 'none'}, mr: 1, cursor: 'pointer'}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={() => navigate("/")}
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        FLIPR
                    </Typography>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <NavBarSearchInput />
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <Tooltip title="Coming soon">
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <MailIcon/>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Coming soon">
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}