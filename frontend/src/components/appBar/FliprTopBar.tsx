import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import {Button, InputBase, Tooltip} from "@mui/material";
import FliprLoginRegisterDialog from "../dialogs/FliprLoginRegisterDialog";
import {useCallback, useState} from "react";
import LoginIcon from '@mui/icons-material/Login';
import {FliprUserDTO} from "../models/FliprUserDTO";
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router";

type FliprTopBarProps = {
    username: string,
    isAuthenticated: boolean,
    login: (userToLogin: FliprUserDTO) => Promise<unknown>,
    logout: () => Promise<unknown>,
    register: (userToRegister: FliprUserDTO) => Promise<unknown>,
}

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function FliprTopBar(props: FliprTopBarProps) {

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    }, []);
    const handleCloseNavMenu = useCallback(() => {
        setAnchorElNav(null);
    }, []);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const navigate = useNavigate();

    const handleMobileMenuClose = useCallback(() => {
        setMobileMoreAnchorEl(null);
    }, []);

    const handleMobileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    }, []);

    const handleLogoutClick = useCallback(() => {
        props.logout().then(() => {
            handleMobileMenuClose();
        });
    }, [handleMobileMenuClose, props]);

    const handleLoginClick = useCallback(() => {
        setOpenLoginDialog(true);
        handleMobileMenuClose();
    }, [handleMobileMenuClose]);

    const handleCloseLoginDialog = useCallback(() => {
        setOpenLoginDialog(false);
    }, []);

    const handleMyProfileClick = useCallback(() => {
        navigate("/my-profile");
        handleMobileMenuClose();
    }, [handleMobileMenuClose, navigate]);

    const handleHomeClick = useCallback(() => {
        navigate("/");
        handleCloseNavMenu();
    }, [handleCloseNavMenu, navigate]);

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        props.isAuthenticated ?
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
                <MenuItem onClick={handleLogoutClick}>
                    <IconButton
                        size="large"
                        aria-label="logout"
                        color="inherit"
                    >
                        <LogoutIcon/>
                    </IconButton>
                    <p>Logout</p>
                </MenuItem>
                <MenuItem onClick={handleMyProfileClick}>
                    <IconButton
                        size="large"
                        aria-label={"account of " + props.username}
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle/>
                    </IconButton>
                    <p>My Profile</p>
                </MenuItem>
            </Menu> :
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
                <MenuItem onClick={handleLoginClick}>
                    <IconButton size="large" aria-label="login" color="inherit">
                        <LoginIcon/>
                    </IconButton>
                    <p>Login</p>
                </MenuItem>
            </Menu>
    );

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
                    </Box>
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
                        <MenuItem key={"Home"} onClick={handleHomeClick}>
                            <Typography textAlign="center">{"Home"}</Typography>
                        </MenuItem>
                    </Menu>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >
                        FLIPR
                    </Typography>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            key={"Home"}
                            onClick={handleHomeClick}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            {"Home"}
                        </Button>
                    </Box>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                        />
                    </Search>
                    <Box sx={{flexGrow: 1}}/>
                    {
                        props.isAuthenticated ?
                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                <Tooltip title="My Profile" followCursor>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label={"account of " + props.username}
                                        aria-haspopup="true"
                                        color="inherit"
                                        onClick={handleMyProfileClick}
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Logout" followCursor>
                                    <IconButton size="large" aria-label="logout" color="inherit"
                                                onClick={handleLogoutClick}>
                                        <LogoutIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Box> :
                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                <Button color="inherit" onClick={handleLoginClick}>Login</Button>
                                <FliprLoginRegisterDialog register={props.register} username={props.username}
                                                          login={props.login}
                                                          open={openLoginDialog}
                                                          handleClose={handleCloseLoginDialog}/>
                            </Box>
                    }
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        {
                            props.isAuthenticated ?
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon/>
                                </IconButton> :
                                <IconButton
                                    size="large"
                                    aria-label="login"
                                    aria-haspopup="true"
                                    onClick={handleLoginClick}
                                    color="inherit"
                                >
                                    <LoginIcon/>
                                </IconButton>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </Box>
    );
}