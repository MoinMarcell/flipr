import {Flipr} from "../Model/Flipr";
import {Avatar, Card, CardActions, CardContent, CardHeader, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";
import React, {useCallback} from "react";
import {red} from "@mui/material/colors";

type FliprCardProps = {
    flipr: Flipr,
    username: string,
    handleDelte: (id: string | undefined) => void
}

export default function FliprCard(props: FliprCardProps) {

    const navigate = useNavigate();

    const onClickComment = useCallback(() => {
        navigate("/flipr/" + props.flipr.id)
    }, [navigate, props.flipr.id]);

    const onClickDelete = useCallback(() => {
        props.handleDelte(props.flipr.id);
    }, [props]);

    return (

        <Card sx={{mt: 2}}>
            <CardHeader
                sx={{bgcolor: '#2196f3'}}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.flipr.author}
                subheader="September 14, 2016"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.flipr.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Tooltip title="Share" placement="top">
                    <Button size="small"><ShareIcon/></Button>
                </Tooltip>
                <Tooltip title="Comment" placement="top">
                    <Button size="small" onClick={onClickComment}><CommentIcon/></Button>
                </Tooltip>
                <Tooltip title="Like" placement="top">
                    <Button size="small"><FavoriteIcon/></Button>
                </Tooltip>
                {
                    props.username && props.username !== 'anonymousUser' && props.username === props.flipr.author ?
                        <Tooltip title="Delete" placement="top">
                            <Button size="small" onClick={onClickDelete}><DeleteIcon/></Button>
                        </Tooltip> :
                        ''
                }
            </CardActions>
        </Card>

    );

}
