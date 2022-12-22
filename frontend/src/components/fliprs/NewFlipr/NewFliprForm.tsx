import {Alert, Button, Snackbar, TextField} from "@mui/material";
import React, {ChangeEvent, FormEvent, useState} from "react";

type NewFliprFormProps = {
    onSaveFlipr: (content: string) => void
}

const NewFliprForm = (props: NewFliprFormProps) => {

    const [content, setContent] = useState<string>('');
    const [characters, setCharacters] = useState<number>(0)

    const changeContentHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
        changeCharactersHandler(event.target.value.length);
    }

    const changeCharactersHandler = (characterLengthFromValue: number) => {
        setCharacters(characterLengthFromValue);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleClickOpenSnackbar();
        props.onSaveFlipr(content);
        setContent('');
        setCharacters(0);
    }

    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleClickOpenSnackbar = () => {
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                id="outlined-multiline-static"
                label="Your flipr"
                multiline
                rows={4}
                fullWidth
                value={content}
                onChange={changeContentHandler}
            />
            <div>
                {content.length > 250 || content === '' || content.length < 2 ?
                    <Button type={"submit"} variant="contained" sx={{mt: 1}} disabled>flipr it now!</Button>
                    : <Button type={"submit"} variant="contained" sx={{mt: 1}}>flipr it now!</Button>}
                <p>{characters} / 250</p>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>
                    You flipr'd it!
                </Alert>
            </Snackbar>
        </form>
    );
}

export default NewFliprForm;
