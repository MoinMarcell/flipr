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

type FliprCardProps = {
    flipr: Flipr,
}

export default function FliprCard(props: FliprCardProps) {
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
                subheader={props.flipr.dateTime.toString()}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.flipr.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
}
