import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Comment} from "../model/Comment";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import {
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from "@mui/lab";

type FliprCommentItemProps = {
    comment: Comment,
}

export default function FliprCommentItem(props: FliprCommentItemProps) {

    const date: Date = new Date(props.comment.dateTime);
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    let minutesString: string = minutes.toString();
    if(minutes < 10){
        minutesString = "0" + minutes;
    }

    return (
        <TimelineItem>
            <TimelineOppositeContent color="textSecondary">
                {
                    (hours >= 12) ?
                        hours + ":" + minutesString + " pm" :
                        hours + ":" + minutesString + " am"
                }
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot/>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: red[500]}} aria-label="flipr">
                                A
                            </Avatar>
                        }
                        title={props.comment.author}
                        subheader={month + " " + day + ", " + year}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {props.comment.content}
                        </Typography>
                    </CardContent>
                </Card>
            </TimelineContent>
        </TimelineItem>
    );
}