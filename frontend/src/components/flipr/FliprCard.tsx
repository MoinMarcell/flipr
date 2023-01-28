import {Flipr} from "../model/Flipr";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Alert, AlertColor, Badge, Box, createTheme, Divider, Grid, ThemeProvider} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useCallback, useState} from "react";
import Snackbar, {SnackbarOrigin} from "@mui/material/Snackbar";
import CommentIcon from '@mui/icons-material/Comment';
import {useNavigate} from "react-router-dom";

type FliprCardProps = {
    flipr: Flipr,
    username: string,
    deleteFlipr(fliprId: string): Promise<string>,
    likeFlipr(fliprId: string, username: string): Promise<string>,
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export interface State extends SnackbarOrigin {
    open: boolean;
}

export default function FliprCard(props: FliprCardProps) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [snackBarText, setSnackBarText] = useState<string>("");
    const [snackBarSeverity, setSnackBarSeverity] = useState<AlertColor | undefined>("error");
    const [openSnackBar, setOpenSnackBar] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const [favColor, setFavColor] = useState<"success" | "info" | "warning" | "error" | "disabled" | "action" | "inherit" | "primary" | "secondary" | undefined>(undefined);

    const {vertical, horizontal, open} = openSnackBar;

    const navigate = useNavigate();

    const handleOpenSnackBar = (newState: SnackbarOrigin) => {
        setOpenSnackBar({open: true, ...newState});
    };

    const handleCloseSnackBar = useCallback(() => {
        setOpenSnackBar({...openSnackBar, open: false});
    }, [openSnackBar]);

    const handleOpenMoreMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleCloseMoreMenu = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleDeleteClick = useCallback(() => {
        props.deleteFlipr(props.flipr.id)
            .then(() => {
                console.log(openSnackBar);
                setSnackBarText("Flipr deleted successfully!");
                setSnackBarSeverity("success");
                handleOpenSnackBar({
                    vertical: 'top',
                    horizontal: 'right',
                })
                navigate("/");
                console.log(openSnackBar);
            });
    }, [props, openSnackBar, navigate]);

    const handleCommentClick = useCallback(() => {
        navigate("/flipr/" + props.flipr.id);
    }, [navigate, props.flipr.id]);

    const handleLikeClick = useCallback(() => {
        props.likeFlipr(props.flipr.id, props.username)
            .then()
            .catch();
        setFavColor("error");
    }, [props]);

    const date = new Date(props.flipr.dateTime);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    const isAuthenticated: boolean = props.username !== 'anonymousUser' && props.username !== undefined && props.username !== null && props.username === props.flipr.author;

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid component={"article"} item>
                <Card sx={{width: 345, height: '100%'}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                A
                            </Avatar>
                        }
                        action={
                            isAuthenticated ?
                                <Box>
                                    <IconButton aria-label="settings" onClick={handleOpenMoreMenu}>
                                        <MoreVertIcon/>
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
                                        onClose={handleCloseMoreMenu}
                                    >
                                        <MenuItem onClick={handleDeleteClick}>Delete this Flipr</MenuItem>
                                    </Menu>
                                </Box> :
                                ''
                        }
                        title={props.flipr.author}
                        subheader={month + " " + day + ", " + year}
                    />
                    <CardContent onClick={handleCommentClick}>
                        <Typography variant="body2">
                            {props.flipr.content}
                        </Typography>
                    </CardContent>
                    <Divider variant="middle"/>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
                            <Badge badgeContent={props.flipr.likes} color="primary">
                                <FavoriteIcon color={favColor}/>
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon/>
                        </IconButton>
                        <IconButton aria-label="comments" onClick={handleCommentClick}>
                            <Badge badgeContent={props.flipr.comments.length} color="primary">
                                <CommentIcon/>
                            </Badge>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                open={open}
                onClose={handleCloseSnackBar}
                key={vertical + horizontal}
            >
                <Alert onClose={handleCloseSnackBar} severity={snackBarSeverity} sx={{width: '100%'}}>
                    {snackBarText}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
