import {Button, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";

type NewFliprProps = {
    content: (content:string) => void
}

const NewFlipr = (props: NewFliprProps) => {

    const [content, setContent] = useState<string>("")

    function handleContentChange(event: ChangeEvent<HTMLInputElement>) {
        const changedInput = event.target.value;
        setContent(changedInput);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        props.content(content);
        setContent("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="outlined-multiline-static"
                    label="Your flipr"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={handleContentChange}
                />
                <Button type={"submit"} variant="contained" sx={{mt: 1}}>Contained</Button>
            </form>
        </div>
    );
}

export default NewFlipr;
