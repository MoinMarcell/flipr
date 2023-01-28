import {
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from "@mui/lab";
import {Comment} from "../model/Comment";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import {Box, Divider} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import Card from "@mui/material/Card";
import * as React from "react";
import {useCallback} from "react";

type CommentCardProps = {
    comment: Comment,
    username: string,
}

export default function CommentCard(props: CommentCardProps) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const date = new Date(props.comment.dateTime);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const handleOpenMoreMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleCloseMoreMenu = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const isAuthenticated: boolean = props.username !== 'anonymousUser' && props.username !== undefined && props.username !== null && props.username === props.comment.author;

    return (
        <TimelineItem>
            <TimelineOppositeContent
                sx={{m: 'auto 0'}}
                align="right"
                variant="body2"
                color="text.secondary"
            >
                {hours + ":" + minutes}
                {hours > 12 ? " pm" : " am"}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineConnector/>
                <TimelineDot>
                    <CommentIcon/>
                </TimelineDot>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent sx={{py: '12px', px: 2}}>
                <Card sx={{width: "100%", height: '100%'}}>
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
                                        <MenuItem>Delete this Comment</MenuItem>
                                    </Menu>
                                </Box> :
                                ''
                        }
                        title={props.comment.author}
                        subheader={month + " " + day + ", " + year}
                    />
                    <CardContent>
                        <Typography variant="body2">
                            {props.comment.content}
                        </Typography>
                    </CardContent>
                    <Divider variant="middle"/>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            </TimelineContent>
        </TimelineItem>
    );
}
