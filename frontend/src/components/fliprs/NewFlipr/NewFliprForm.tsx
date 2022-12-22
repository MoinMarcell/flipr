import {Button, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";

type NewFliprFormProps = {
    onSaveFlipr: (content: string) => void
}

const NewFliprForm = (props: NewFliprFormProps) => {

    const [content, setContent] = useState<string>('');

    const changeContentHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSaveFlipr(content);
        setContent('');
    }

    return(
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
            <Button type={"submit"} variant="contained" sx={{mt: 1}}>flipr it now!</Button>
        </form>
    );
}

export default NewFliprForm;