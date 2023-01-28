import React, {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {Box, Button, TextField} from "@mui/material";

type PostCommentProps = {
    fliprId: string,
    postComment(content: string, fliprId: string): Promise<unknown>,
}

export default function PostComment(props: PostCommentProps) {

    const [content, setContent] = useState<string>("");

    const handleChangeContent = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }, []);
    
    const handleSubmitComment = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.postComment(content, props.fliprId)
            .then(() => {
                setContent("");
            })
            .catch();
    }, [content, props]);

    return (
            <Box component={"form"} onSubmit={handleSubmitComment}>
                <TextField label="Your Comment" color={"info"} onChange={handleChangeContent} value={content} name={"content"} fullWidth/>
                <Button variant={"outlined"} type={"submit"} fullWidth sx={{mt: 1}} color={"secondary"}>Post
                    Comment</Button>
            </Box>
    );
}