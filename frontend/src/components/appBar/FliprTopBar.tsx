import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import {Button, Tooltip} from "@mui/material";
import FliprLoginRegisterDialog from "../dialogs/FliprLoginRegisterDialog";
import {useCallback, useState} from "react";
import LoginIcon from '@mui/icons-material/Login';
import {FliprUserDTO} from "../models/FliprUserDTO";
import LogoutIcon from '@mui/icons-material/Logout';

type FliprTopBarProps = {
    username: string,
    isAuthenticated: boolean,
    login: (userToLogin: FliprUserDTO) => Promise<unknown>,
    logout: () => Promise<unknown>,
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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleMobileMenuClose = useCallback(() => {
        setMobileMoreAnchorEl(null);
    }, []);

    const handleMenuClose = useCallback(() => {
        setAnchorEl(null);
        handleMobileMenuClose();
    }, [handleMobileMenuClose]);

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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

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
                <MenuItem>
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
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >
                        FLIPR
                    </Typography>
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
                                <Tooltip title="My Profile">
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label={"account of " + props.username}
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Logout">
                                    <IconButton size="large" aria-label="logout" color="inherit">
                                        <LogoutIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Box> :
                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                <Button color="inherit" onClick={handleLoginClick}>Login</Button>
                                <FliprLoginRegisterDialog login={props.login} open={openLoginDialog}
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
            {renderMenu}
        </Box>
    );
}