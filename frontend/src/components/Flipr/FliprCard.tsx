import {Flipr} from "../Model/Flipr";
import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import image from "../../img/contemplative-reptile.jpg";
import Button from "@mui/material/Button";
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from '@mui/icons-material/Delete';

type FliprCardProps = {
    flipr: Flipr,
    username: string,
    handleDelte: (id: string | undefined) => void
}

export default function FliprCard(props: FliprCardProps) {

    function handleDelete(){
        props.handleDelte(props.flipr.id)
    }

    return (

        <Card sx={{mt: 2}}>
            <CardMedia
                sx={{height: 280}}
                image={image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.flipr.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.flipr.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Tooltip title="Share" placement="top">
                    <Button size="small"><ShareIcon/></Button>
                </Tooltip>
                <Tooltip title="Comment" placement="top">
                    <Button size="small"><CommentIcon/></Button>
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
