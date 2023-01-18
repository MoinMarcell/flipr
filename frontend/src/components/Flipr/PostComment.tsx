import {Input} from "@mui/joy";
import {Box, Button} from "@mui/material";
import {ChangeEvent, FormEvent, useCallback, useState} from "react";

type PostCommentProps = {
    postComment(content: string): void,
}

export default function PostComment(props: PostCommentProps){

    const [content, setContent] = useState<string>("");

    const handleChangeContent = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }, [setContent]);

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.postComment(content);
        setContent("");
    }, [content, props]);
    
    return(
        <Box component={"form"} display={"flex"} onSubmit={handleSubmit}>
            <Input
                onChange={handleChangeContent}
                value={content}
                variant="plain"
                size="sm"
                placeholder="Add a comment…"
                sx={{flexGrow: 0, width: 140, '--Input-focusedThickness': '0px'}}
            />
            <Button type={"submit"}></Button>
        </Box>
    );
}