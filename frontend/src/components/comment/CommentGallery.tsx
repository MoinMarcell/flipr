import CommentCard from "./CommentCard";
import {Timeline, timelineOppositeContentClasses} from "@mui/lab";
import {Comment} from "../model/Comment";

type CommentGalleryProps = {
    comments: Comment[],
    username: string,
}

export default function CommentGallery(props: CommentGalleryProps){

    const commentCard = props.comments.map((comment) => {
        return (
            <CommentCard username={props.username} comment={comment} key={comment.id} />
        );
    }).reverse();

    return(
        <Timeline
            sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2,
                },
            }}
        >
            {commentCard}
        </Timeline>
    );
}
