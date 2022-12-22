import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {
    Button,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Drawer,
    ListItem,
    ListItemButton,
    ListItemIcon,
    TextField
} from '@mui/material';
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";

type Anchor = 'left';

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({...state, [anchor]: open});
            };

    const list = (anchor: Anchor) => (
        <Box
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <i className="fa-solid fa-house-chimney"></i>
                        </ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <i className="fa-solid fa-terminal"></i>
                        </ListItemIcon>
                        <ListItemText primary={"fliprs"}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed">
                <Toolbar>
                    {(['left'] as const).map((anchor) => (
                        <React.Fragment key={anchor}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(anchor, true)}
                                sx={{mr: 2}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Drawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                            >
                                {list(anchor)}
                            </Drawer>
                        </React.Fragment>
                    ))}
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <i className="fa-solid fa-terminal"></i>flipr
                    </Typography>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleClickOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                </Toolbar>
            </AppBar>
            <div>
                <Dialog open={open} onClose={handleCloseModal}>
                    <DialogTitle>Register</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                        <Button onClick={handleCloseModal}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Box>
    );
}