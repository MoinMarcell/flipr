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
import {Flipr} from "../models/Flipr";
import {Badge, Divider, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useCallback, useEffect, useState} from "react";
import FliprSnackBar from "../snackbar/FliprSnackBar";
import {AlertColor} from "@mui/material/Alert";
import DeleteIcon from '@mui/icons-material/Delete';

type FliprCardProps = {
    flipr: Flipr,
    username: string,
    isAuthenticated: boolean,
    addFliprToFavorites(username: string, fliprId: string): Promise<unknown>,
    isLikedFlipr(username: string, fliprId: string): Promise<unknown>,
    deleteFlipr(fliprId: string): Promise<unknown>,
}
export default function FliprCard(props: FliprCardProps) {

    const navigate = useNavigate();

    const date = new Date(props.flipr.dateTime);
    const day = date.getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const dateToShow = month + " " + day + ", " + year;
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [openSnackBar, setOpenSnackBar] = useState<boolean | undefined>(false);
    const [snackBarMessage, setSnackBarMessage] = useState<string>("");
    const [snackBarSeverity, setSnackBarSeverity] = useState<AlertColor | undefined>(undefined);

    const handleCloseSnackBar = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            setOpenSnackBar(false);
        }

        setOpenSnackBar(false);
    }, []);

    const handleAvatarClick = useCallback(() => {
        navigate("/profiles/" + props.flipr.author);
    }, [navigate, props.flipr.author]);

    const handleAddToFavoritesClick = useCallback(() => {
        if (props.isAuthenticated) {
            props.addFliprToFavorites(props.username, props.flipr.id)
                .then(() => {
                    console.log("Flipr added to your Favorites!");
                })
                .catch((e) => {
                    if (e.response.status === 401) {
                        setSnackBarMessage("You are not logged in!");
                        setSnackBarSeverity("error");
                        setOpenSnackBar(true);
                    } else if (e.response.status === 400) {
                        setSnackBarMessage("Flipr is already favorite!");
                        setSnackBarSeverity("error");
                        setOpenSnackBar(true);
                    }
                });
        }
    }, [props]);

    const handleShareClick = useCallback(() => {
        navigator.clipboard.writeText(window.location + "fliprs/" + props.flipr.id)
            .then(() => {
                setSnackBarMessage("Link copied successfully to your Clipboard!");
                setSnackBarSeverity("success");
                setOpenSnackBar(true);
            })
            .catch(() => {
                setSnackBarMessage("Something went wrong! Try again later.");
                setSnackBarSeverity("error");
                setOpenSnackBar(true);
            })
    }, [props.flipr.id]);

    const handleDeleteClick = useCallback(() => {
        props.deleteFlipr(props.flipr.id)
            .then(() => {
                setSnackBarMessage("Flipr deleted successfully!");
                setSnackBarSeverity("success");
                setOpenSnackBar(true);
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    setSnackBarMessage("Not logged in!");
                    setSnackBarSeverity("error");
                    setOpenSnackBar(true);
                } else {
                    setSnackBarMessage("Something went wrong! Try again later.");
                    setSnackBarSeverity("error");
                    setOpenSnackBar(true);
                }
            })
    }, [props]);

    useEffect(() => {
        if (!isFavorite && props.isAuthenticated) {
            props.isLikedFlipr(props.username, props.flipr.id)
                .then(() => {
                    setIsFavorite(true);
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        setIsFavorite(false);
                    }
                })
        }
    }, [isFavorite, props])

    return (
        <Grid item sx={{width: '95%'}}>
            <Card>

                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500], cursor: 'pointer'}} aria-label="recipe"
                                onClick={handleAvatarClick}>
                            {props.flipr.author.charAt(0)}
                        </Avatar>
                    }
                    action={
                        props.isAuthenticated && props.username === props.flipr.author ?
                            <IconButton aria-label="settings" onClick={handleDeleteClick}>
                                <DeleteIcon/>
                            </IconButton> :
                            ''
                    }
                    title={<Link to={"/profiles/" + props.flipr.author}>{props.flipr.author}</Link>}
                    subheader={dateToShow}
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.flipr.content}
                    </Typography>
                </CardContent>

                <Divider variant={"middle"}/>

                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={handleAddToFavoritesClick}>
                        <Badge badgeContent={props.flipr.likes} color="primary">
                            <FavoriteIcon color={isFavorite ? "error" : undefined}/>
                        </Badge>
                    </IconButton>
                    <IconButton aria-label="share" onClick={handleShareClick}>
                        <ShareIcon/>
                    </IconButton>
                </CardActions>

            </Card>
            <FliprSnackBar open={openSnackBar} severity={snackBarSeverity} handleClose={handleCloseSnackBar}
                           message={snackBarMessage}/>
        </Grid>
    );
}