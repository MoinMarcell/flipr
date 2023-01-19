import {FliprDTO} from "../model/FliprDTO";
import {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {Box, Button, CircularProgress, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Flipr} from "../model/Flipr";

type PostFliprProps = {
    username: string,
    postFlipr: (fliprToSave: FliprDTO) => Promise<Flipr>,
}

export default function PostFlipr(props: PostFliprProps) {
    const [content, setContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleChangeContent = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }, []);

    const handleSubmitPostFlipr = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)
        await props.postFlipr({
            "content": content,
            "author": props.username
        }).then(() => {
            setContent("");
            setIsLoading(false);
        })
    }, [content, props]);

    const handleLoginClick = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    let button = <Button type={"submit"} variant={"outlined"} sx={{mt: 2}}>FLIPR IT!</Button>

    if (isLoading) {
        button = <Button variant={"outlined"} sx={{mt: 2}} disabled><CircularProgress/></Button>
    }

    if(content.length < 3 || content.trim() === ""){
        button = <Button variant={"outlined"} sx={{mt: 2}} disabled>MINIMUM 3 CHARACTERS</Button>
    }

    if(content.length > 250){
        button = <Button variant={"outlined"} sx={{mt: 2}} disabled>MAXIMUM 250 CHARACTERS</Button>
    }

    return (
        <Box component={"form"} onSubmit={handleSubmitPostFlipr}>
            <TextField
                id="outlined-multiline-static"
                label="Your Message"
                multiline
                rows={4}
                value={content}
                onChange={handleChangeContent}
                fullWidth
            />
            {
                props.username && props.username !== 'anonymousUser' ?
                    button :
                    <Button sx={{mt: 2}} variant={"outlined"} onClick={handleLoginClick}>LOGIN FIRST!</Button>
            }
        </Box>
    );
}