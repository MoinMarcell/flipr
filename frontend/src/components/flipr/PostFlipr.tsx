import {Box, Button, TextField} from "@mui/material";
import React, {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {AlertColor} from "@mui/material/Alert";
import FliprSnackBar from "../snackbar/FliprSnackBar";
import {FliprDTO} from "../models/FliprDTO";

type PostFliprProps = {
    saveFlipr(fliprToSave: FliprDTO): Promise<unknown>,
    author: string,
}

export default function PostFlipr(props: PostFliprProps){

    const [openPostFliprSnackBar, setOpenPostFliprSnackBar] = useState<boolean | undefined>(false);
    const [snackBarMessage, setSnackBarMessage] = useState<string>("");
    const [snackBarSeverity, setSnackBarSeverity] = useState<AlertColor | undefined>(undefined);
    const [fliprToSave, setFliprToSave] = useState<FliprDTO>({
        content: "",
        author: "",
    });

    const handleCloseSnackBar = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            setOpenPostFliprSnackBar(false);
        }

        setOpenPostFliprSnackBar(false);
    }, []);

    const handleChangeFliprContent = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFliprToSave({
            ...fliprToSave,
            content: event.target.value,
            author: props.author,
        });
    }, [fliprToSave, props.author]);
    
    const handleSubmitPostFlipr = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.saveFlipr(fliprToSave)
            .then(() => {
                setSnackBarMessage("Flipr sent!");
                setSnackBarSeverity("success");
                setOpenPostFliprSnackBar(true);
                setFliprToSave({
                    ...fliprToSave,
                    content: "",
                    author: "",
                });
            })
            .catch((e) => {
                if(e.response.status === 401){
                    setSnackBarMessage("You are not logged in!")
                    setSnackBarSeverity("error");
                    setOpenPostFliprSnackBar(true);
                    setFliprToSave({
                        ...fliprToSave,
                        content: "",
                        author: "",
                    });
                } else {
                    setSnackBarMessage("Something went wrong! Try again later.")
                    setSnackBarSeverity("error");
                    setOpenPostFliprSnackBar(true);
                    setFliprToSave({
                        ...fliprToSave,
                        content: "",
                        author: "",
                    });
                }
            });
    }, [fliprToSave, props]);

    return(
        <Box component={"form"} onSubmit={handleSubmitPostFlipr}>
            <TextField label="Your Flipr" color={"info"} onChange={handleChangeFliprContent} value={fliprToSave.content} name={"fliprContent"} fullWidth/>
            <Button variant={"outlined"} type={"submit"} fullWidth sx={{mt: 1}} color={"secondary"}>Post
                Flipr</Button>
            <FliprSnackBar open={openPostFliprSnackBar} severity={snackBarSeverity} handleClose={handleCloseSnackBar} message={snackBarMessage} />
        </Box>
    );
}