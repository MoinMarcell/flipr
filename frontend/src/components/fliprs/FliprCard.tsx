import * as React from 'react';
import {Flipr} from "../models/Flipr";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import avatar from "./img/avatars/dolphin.png"

type FliprCardProps = {
    flipr: Flipr
}

const FliprCard = (props: FliprCardProps) => {
    return (
        <span>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={avatar} />
                </ListItemAvatar>
                <ListItemText
                    primary={props.flipr.content}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                by {props.flipr.author.username}
                            </Typography>
                            {" — postet 2h ago"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </span>
    );
}

export default FliprCard;