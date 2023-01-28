import {useParams} from "react-router-dom";
import useFlipr from "../hooks/useFlipr";
import FliprCard from "./FliprCard";
import {Grid} from "@mui/material";
import CommentGallery from "../comment/CommentGallery";
import CommentPost from "../comment/CommentPost";

type FliprDetailsProps = {
    username: string,
    deleteFlipr(fliprId: string): Promise<string>,
}

export default function FliprDetails(props: FliprDetailsProps) {

    const params = useParams();
    const id: string | undefined = params.id;

    const {flipr, postComment} = useFlipr(props.username, id);

    return (
        <Grid container spacing={2}>
            <Grid item>
                <FliprCard flipr={flipr} username={props.username} deleteFlipr={props.deleteFlipr}/>
            </Grid>
            <Grid item>
                <CommentPost saveComment={postComment} fliprId={flipr.id} author={props.username} />
                <CommentGallery username={props.username} comments={flipr.comments} />
            </Grid>
        </Grid>
    );
}