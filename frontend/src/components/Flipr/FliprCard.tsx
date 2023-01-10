import {Flipr} from "../Model/Flipr";
import {Avatar, Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import image from "../../img/contemplative-reptile.jpg";
import Button from "@mui/material/Button";
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import Box from "@mui/material/Box";
import React from "react";

type FliprCardProps = {
    flipr: Flipr,
    username: string,
    handleDelte: (id: string | undefined) => void
}

export default function FliprCard(props: FliprCardProps) {

    const navigate = useNavigate();

    function handleDelete() {
        props.handleDelte(props.flipr.id)
        navigate("/")
    }

    return (

        <Card sx={{mt: 2}}>
            <CardMedia
                sx={{height: 280}}
                image={image}
                title="green iguana"
            />
            <CardContent>
                <Box sx={{display: 'flex', mb: 3, alignItems: 'center'}} alignContent={'middle'}>
                    <Avatar alt="Remy Sharp" sx={{mr: 2}}><PersonIcon/></Avatar>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.flipr.author}
                        <Typography sx={{fontSize: 'small'}}>fliprd 2h ago</Typography>
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {props.flipr.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Tooltip title="Share" placement="top">
                    <Button size="small"><ShareIcon/></Button>
                </Tooltip>
                <Tooltip title="Comment" placement="top">
                    <Button size="small" onClick={() => navigate("/flipr/" + props.flipr.id)}><CommentIcon/></Button>
                </Tooltip>
                <Tooltip title="Like" placement="top">
                    <Button size="small"><FavoriteIcon/></Button>
                </Tooltip>
                {
                    props.username && props.username !== 'anonymousUser' && props.username === props.flipr.author ?
                        <Tooltip title="Delete" placement="top">
                            <Button size="small" onClick={handleDelete}><DeleteIcon/></Button>
                        </Tooltip> :
                        ''
                }
            </CardActions>
        </Card>

    );

}
