import {Button, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";

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

    const changeCharactersHandler = (getCharacterLengthFromValue: number) => {
        setCharacters(getCharacterLengthFromValue);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSaveFlipr(content);
        setContent('');
        setCharacters(0);
    }
    if (content === '' || content.length < 2) {
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
                <Button type={"submit"} variant="contained" sx={{mt: 1}} disabled>flipr it now!</Button>
                <p>{characters} / 250</p>
            </form>
        );
    } else if (content.length > 250) {
        return (
            <form onSubmit={handleSubmit}>
                <TextField
                    error
                    id="outlined-error"
                    label="Your flipr"
                    multiline
                    rows={4}
                    fullWidth
                    value={content}
                    onChange={changeContentHandler}
                />
                <Button type={"submit"} variant="contained" sx={{mt: 1}} disabled>flipr it now!</Button>
                <p>{characters} / 250</p>
            </form>
        );
    } else {
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
                    <Button type={"submit"} variant="contained" sx={{mt: 1}}>flipr it now!</Button>
                    <p>{characters} / 250</p>
                </div>
            </form>
        );
    }
}

export default NewFliprForm;
