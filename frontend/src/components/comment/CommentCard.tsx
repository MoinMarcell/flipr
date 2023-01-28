import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import {Comment} from "../models/Comment";
import {red} from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import {useCallback, useState} from "react";
import {useNavigate} from "react-router";
import {Badge, Card, CardActions, CardContent, Divider} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import FliprSnackBar from "../snackbar/FliprSnackBar";
import {AlertColor} from "@mui/material/Alert";

type CommentCardProps = {
    comment: Comment,
    isAuthenticated: boolean,
}

export default function CommentCard(props: CommentCardProps) {

    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(0);
    const [openSnackBar, setOpenSnackBar] = useState<boolean | undefined>(false);
    const [snackBarMessage, setSnackBarMessage] = useState<string>("");
    const [snackBarSeverity, setSnackBarSeverity] = useState<AlertColor | undefined>(undefined);

    const date = new Date(props.comment.dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const isPm = hours > 12;

    const navigate = useNavigate();

    const handleCloseSnackBar = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            setOpenSnackBar(false);
        }

        setOpenSnackBar(false);
    }, []);

    const handleAvatarClick = useCallback(() => {
        navigate("/profiles/" + props.comment.author);
    }, [navigate, props.comment.author]);

    const handleFavoriteClick = useCallback(() => {
        if (props.isAuthenticated) {
            if (isFavorite) {
                setIsFavorite(false);
                setLikes((prevState) => prevState - 1);
            } else {
                setIsFavorite(true);
                setLikes((prevState) => prevState + 1);
            }
        } else {
            setSnackBarMessage("You are not logged in!")
            setSnackBarSeverity("error");
            setOpenSnackBar(true);
        }
    }, [isFavorite, props.isAuthenticated]);

    return (
        <Timeline position="alternate">
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{m: 'auto 0'}}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                >
                    {hours + ":" + minutes + (isPm ? " pm" : " am")}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector/>
                    <TimelineDot>
                        <Avatar sx={{bgcolor: red[500], cursor: 'pointer'}} aria-label="recipe"
                                onClick={handleAvatarClick}>
                            {props.comment.author.charAt(0)}
                        </Avatar>
                    </TimelineDot>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent sx={{py: '12px', px: 2}}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                {month + " " + day + ", " + year}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {props.comment.author}
                            </Typography>
                            <Typography variant="body2">
                                {props.comment.content}
                            </Typography>
                        </CardContent>
                        <Divider variant={"middle"}/>
                        <CardActions>
                            <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
                                <Badge badgeContent={likes} color="primary">
                                    <FavoriteIcon color={isFavorite ? "error" : undefined}/>
                                </Badge>
                            </IconButton>
                        </CardActions>
                    </Card>
                </TimelineContent>
            </TimelineItem>
            <FliprSnackBar open={openSnackBar} severity={snackBarSeverity} handleClose={handleCloseSnackBar} message={snackBarMessage} />
        </Timeline>
    );
}