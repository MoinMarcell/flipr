import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {ChangeEvent, FormEvent, useState} from "react";
import Box from "@mui/material/Box";

type AddFliprProps = {
    handleSubmit: (content: string, username: string) => void,
    username: string,
}

export default function AddFlipr(props: AddFliprProps) {

    const [content, setContent] = useState<string>("");

    const isAuthenticated: boolean = props.username !== 'anonymousUser' && props.username !== null && props.username !== undefined;

    function onChangeContent(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);
    }

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.handleSubmit(content, props.username)
        setContent("")
    }


    return (
        <Box>
            {
                isAuthenticated ?
                    <form onSubmit={onSubmit}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Multiline"
                            multiline
                            rows={4}
                            value={content}
                            onChange={onChangeContent}
                        />
                        <Button type={"submit"}>flipr IT!</Button>
                    </form> :
                    ''
            }
        </Box>
    );

}
