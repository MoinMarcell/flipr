import {Comment} from "../model/Comment";
import FliprCommentItem from "./FliprCommentItem";
import {Grid} from "@mui/material";
import {Timeline, timelineOppositeContentClasses} from "@mui/lab";

type FliprCommentsProps = {
    comments: Comment[],
}

export default function FliprComments(props: FliprCommentsProps) {

    const commentCard = props.comments.map((comment: Comment) => {
        return <FliprCommentItem comment={comment} key={comment.id}/>
    }).reverse();

    return (
        <Grid container>
            <Grid item>
                <Timeline
                    sx={{
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.2,
                        },
                    }}
                >
                    {commentCard}
                </Timeline>
            </Grid>
        </Grid>
    );
}