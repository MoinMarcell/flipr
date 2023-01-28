import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import {Comment} from "../models/Comment";
import CommentCard from "./CommentCard";
import {timelineOppositeContentClasses} from "@mui/lab";

type CommentGalleryProps = {
    comments: Comment[],
}

export default function CommentGallery(props: CommentGalleryProps) {

    const commentCard = props.comments.map((comment) => {
        return (
            <CommentCard comment={comment} key={comment.id} />
        );
    }).reverse();

    return (
        <Timeline position="alternate" sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
            },
        }}>
            {commentCard}
        </Timeline>
    );
}