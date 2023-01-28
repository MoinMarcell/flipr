import {Flipr} from "../model/Flipr";
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
import CommentIcon from '@mui/icons-material/Comment';
import {useNavigate} from "react-router-dom";
import {Input} from "@mui/joy";
import React, {useCallback} from "react";
import Badge from "@mui/material/Badge";
import {Alert, Divider, Snackbar, Stack, Tooltip} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import RedditIcon from '@mui/icons-material/Reddit';
import GitHubIcon from '@mui/icons-material/GitHub';

type FliprCardProps = {
    flipr: Flipr,
    username: string,
}

export default function FliprCard(props: FliprCardProps) {

    const date: Date = new Date(props.flipr.dateTime);
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();
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

    const handleClickComment = useCallback(() => {
        navigate("/flipr/" + props.flipr.id);
    }, [navigate, props.flipr.id]);

    const handleLoginClick = useCallback(() => {
        navigate("/login");
    }, [navigate])

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
        navigator.clipboard.writeText(window.location.href + "flipr/" + props.flipr.id)
            .then(() => {
                handleOpenSnackBar();
            });
    }, [handleOpenSnackBar, props.flipr.id]);

    return (
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
                title={props.flipr.author}
                subheader={month + " " + day + ", " + year}
            />
            <CardContent>
                <Typography sx={{wordBreak: "break-word"}} variant="body2" color="text.secondary" paragraph>
                    {props.flipr.content}
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
                <IconButton onClick={handleClickComment} aria-label={"comment"}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Badge badgeContent={props.flipr.comments.length} color="primary">
                        <CommentIcon/>
                    </Badge>
                </IconButton>
                {
                    (props.username && props.username !== 'anonymousUser') ?
                        <Input
                            onClick={handleClickComment}
                            variant="plain"
                            size="sm"
                            placeholder="Add a comment…"
                            sx={{flexGrow: 0, width: 140, '--Input-focusedThickness': '0px'}}
                        /> :
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
    );
}
