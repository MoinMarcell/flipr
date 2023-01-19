import {useNavigate, useParams} from "react-router-dom";
import useFlipr from "../hooks/useFlipr";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import {Alert, Box, Divider, Snackbar, Stack, Tooltip} from "@mui/material";
import Card from "@mui/material/Card";
import PostComment from "./PostComment";
import FliprComments from "./FliprComments";
import Badge from "@mui/material/Badge";
import {Input} from "@mui/joy";
import React, {useCallback} from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import RedditIcon from "@mui/icons-material/Reddit";

type FliprDetailsProps = {
    username: string,
}

export default function FliprDetails(props: FliprDetailsProps) {

    const params = useParams();
    const id: string | undefined = params.id;
    const {flipr, postComment} = useFlipr(props.username, id);
    const navigate = useNavigate();
    const [openSnackBar, setOpenSnackBar] = React.useState(false);

    const handleOpenSnackBar = useCallback(() => {
        setOpenSnackBar(true);
    }, [setOpenSnackBar]);

    const handleCloseSnackBar = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    }, [setOpenSnackBar]);

    const date: Date = new Date(flipr.dateTime);
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();
    
    const handleLoginClick = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    const longText = (
        <Stack
            direction="row"
            divider={<Divider orientation="vertical" sx={{bgcolor: '#fff'}} flexItem />}
            spacing={2}
        >
            <FacebookIcon />
            <GitHubIcon />
            <RedditIcon />
        </Stack>
    );

    const handleShareClick = useCallback(() => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                handleOpenSnackBar();
            });
    }, [handleOpenSnackBar, flipr.id]);

    return (
        <Box>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500]}} aria-label="flipr">
                            A
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={flipr.author}
                    subheader={month + " " + day + ", " + year}
                />
                <CardContent>
                    <Typography sx={{ wordBreak: "break-word" }} variant="body2" color="text.secondary">
                        {flipr.content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon/>
                    </IconButton>
                    <Tooltip title={longText} placement="top" arrow>
                        <IconButton aria-label="share"
                                    onClick={handleShareClick}>
                            <ShareIcon/>
                        </IconButton>
                    </Tooltip>
                    <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                        <Alert onClose={handleCloseSnackBar} severity="success" sx={{width: '100%'}}>
                            Link copied!
                        </Alert>
                    </Snackbar>
                    <IconButton aria-label={"comment"}>
                        <Badge badgeContent={flipr.comments.length} color="primary">
                            <CommentIcon/>
                        </Badge>
                    </IconButton>
                    {
                        props.username && props.username !== "anonymousUser" ?
                            <PostComment postComment={postComment}/> :
                            <Input
                                onClick={handleLoginClick}
                                variant="plain"
                                size="sm"
                                placeholder="Login to comment..."
                                sx={{flexGrow: 0, width: 140, '--Input-focusedThickness': '0px'}}
                            />
                    }
                </CardActions>
            </Card>
            <FliprComments comments={flipr.comments}/>
        </Box>
    );
}