import {useParams} from "react-router";
import useFlipr from "../hooks/useFlipr";
import FliprCard from "./FliprCard";
import React from "react";
import {Grid} from "@mui/material";
import CommentGallery from "../comment/CommentGallery";
import PostComment from "../comment/PostComment";

type FliprDetailProps = {
    username: string,
    isAuthenticated: boolean,
    addFliprToFavorites(username: string, fliprId: string): Promise<unknown>,
    isLikedFlipr(username: string, fliprId: string): Promise<unknown>,
    deleteFlipr(fliprId: string): Promise<unknown>,
}

export default function FliprDetail(props: FliprDetailProps) {

    const params = useParams();
    const id: string | undefined = params.id;
    const {flipr, postComment} = useFlipr(props.username, id);

    return (
        <Grid container spacing={2} justifyContent={"center"} sx={{mt: '1%', mb: '12%'}}>
            <FliprCard flipr={flipr}
                       username={props.username}
                       isAuthenticated={props.isAuthenticated}
                       addFliprToFavorites={props.addFliprToFavorites}
                       isLikedFlipr={props.isLikedFlipr}
                       deleteFlipr={props.deleteFlipr}
            />
            <Grid item sx={{width: '95%'}}>
                <PostComment postComment={postComment} fliprId={flipr.id}/>
            </Grid>
            <Grid item sx={{width: '95%'}}>
                <CommentGallery comments={flipr.comments}/>
            </Grid>
        </Grid>
    );
}