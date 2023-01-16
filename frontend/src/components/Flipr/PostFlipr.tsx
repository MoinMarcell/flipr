import {FliprDTO} from "../model/FliprDTO";
import {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {Alert, Box, Button, Snackbar, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Flipr} from "../model/Flipr";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';

type PostFliprProps = {
    username: string,
    postFlipr: (fliprToSave: FliprDTO) => Promise<Flipr>,
}

export default function PostFlipr(props: PostFliprProps) {
    const [content, setContent] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleChangeContent = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }, [])

    const handleCloseSnackbar = useCallback(() => {
        setOpenSnackbar(false);
    }, []);

    const handleSubmitPostFlipr = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (await props.postFlipr({
            "content": content,
            "author": props.username
        })) {
            setOpenSnackbar(true);
            setContent("");
        }
    }, [content, props]);
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
                    <Button type={"submit"}>FLIPR IT!</Button> :
                    <Button onClick={() => navigate("/login")}>LOGIN FIRST!</Button>
            }
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                message="Flipr was send!"
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>
                    FLIPR<BubbleChartIcon/> send successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}