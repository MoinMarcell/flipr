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
import {Input} from "@mui/joy";
import CommentIcon from '@mui/icons-material/Comment';
import {Box, Button} from "@mui/material";

type FliprCardProps = {
    flipr: Flipr,
}

export default function FliprCard(props: FliprCardProps) {

    const date: Date = new Date(props.flipr.dateTime);
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();

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
                <IconButton aria-label={"comment"}>
                    <CommentIcon/>
                </IconButton>
                <Box component={"form"} display={"flex"}>
                    <Input
                        variant="plain"
                        size="sm"
                        placeholder="Add a comment…"
                        sx={{flexGrow: 0, width: 140, '--Input-focusedThickness': '0px'}}
                    />
                    <Button type={"submit"} disabled></Button>
                </Box>
            </CardActions>
        </Card>
    );
}
