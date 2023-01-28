import {Alert, AlertColor, Box, Button, Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import React, {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {Flipr} from "../model/Flipr";
import Snackbar, {SnackbarOrigin} from "@mui/material/Snackbar";
import {wait} from "@testing-library/user-event/dist/utils";
import {useNavigate} from "react-router-dom";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

export interface State extends SnackbarOrigin {
    open: boolean;
}

type FliprPostProps = {
    saveComment(commentToSave: string, fliprId: string): Promise<Flipr>,
    author: string,
    fliprId: string,
}

export default function CommentPost(props: FliprPostProps) {

    const [commentToSave, setCommentToSave] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [snackBarText, setSnackBarText] = useState<string>("");
    const [snackBarseverity, setSnackBarseverity] = useState<AlertColor | undefined>("error");
    const [openSnackBar, setOpenSnackBar] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const {vertical, horizontal, open} = openSnackBar;
    const navigate = useNavigate();

    const handleOpenSnackBar = (newState: SnackbarOrigin) => {
        setOpenSnackBar({open: true, ...newState});
    };

    const handleCloseSnackBar = useCallback(() => {
        setOpenSnackBar({...openSnackBar, open: false});
    }, [openSnackBar]);

    const handleChangeContent = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setCommentToSave(event.target.value);
    }, []);

    const handleMouseOverShowEmojiPicker = useCallback(() => {
        setShowEmojiPicker(true);
    }, []);

    const handleCloseEmojiPicker = useCallback(() => {
        setShowEmojiPicker(false);
    }, []);

    const handleOnEmojiClick = useCallback((emoji: any) => {
        handleCloseEmojiPicker();
        setCommentToSave(commentToSave + emoji.native);
    }, [commentToSave, handleCloseEmojiPicker]);

    const handleSubmitComment = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.saveComment(commentToSave, props.fliprId)
            .then(() => {
                console.log(props.author);
                console.log(props.fliprId);
                setIsDisabled(true);
                setSnackBarText("Comment sent!");
                setSnackBarseverity("success");
                handleOpenSnackBar({
                    horizontal: 'right',
                    vertical: 'top',
                });
                wait(1500)
                    .then(() => {
                        setIsDisabled(false);
                        setCommentToSave("")
                    });
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    setIsDisabled(true);
                    setSnackBarText("You are not logged in!");
                    setIsError(true);
                    handleOpenSnackBar({
                        horizontal: 'right',
                        vertical: 'top',
                    });
                    wait(1500)
                        .then(() => {
                            navigate("/login");
                            setIsDisabled(false);
                        });
                } else {
                    setIsDisabled(true);
                    setIsError(true);
                    setSnackBarText("Something went wrong. Try again later!");
                    handleOpenSnackBar({
                        horizontal: 'right',
                        vertical: 'top',
                    });
                }
            });
    }, [commentToSave, navigate, props]);

    return (
        <Box component={"form"} onSubmit={handleSubmitComment}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        error={isError}
                        fullWidth
                        value={commentToSave}
                        onChange={handleChangeContent}
                        label="Your Comment"
                        id="outlined-start-adornment"
                        InputProps={{
                            startAdornment:
                                <InputAdornment onMouseOver={handleMouseOverShowEmojiPicker} position="start">
                                    <IconButton>
                                        <EmojiEmotionsIcon/>
                                    </IconButton>
                                </InputAdornment>,
                        }}
                    />
                    {
                        showEmojiPicker ?
                            <Box>
                                <Picker onClickOutside={handleCloseEmojiPicker} perLine={8} data={data}
                                        onEmojiSelect={handleOnEmojiClick}/>
                            </Box> :
                            ''
                    }
                </Grid>
                <Grid item xs={12} textAlign={"center"}>
                    <Button fullWidth type={"submit"} variant={"outlined"} disabled={isDisabled}>Comment now!</Button>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                open={open}
                onClose={handleCloseSnackBar}
                key={vertical + horizontal}
            >
                <Alert onClose={handleCloseSnackBar} severity={snackBarseverity} sx={{width: '100%'}}>
                    {snackBarText}
                </Alert>
            </Snackbar>
        </Box>
    );
}