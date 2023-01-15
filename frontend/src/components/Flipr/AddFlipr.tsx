import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, {ChangeEvent, FormEvent, useCallback, useState} from "react";
import Box from "@mui/material/Box";

type AddFliprProps = {
    handleSubmit: (content: string, username: string) => void,
    username: string,
}

export default function AddFlipr(this: any, props: AddFliprProps) {

    const [content, setContent] = useState<string>("");

    const isAuthenticated: boolean = props.username !== 'anonymousUser' && props.username !== null && props.username !== undefined;

    const onChangeContent = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }, [setContent])

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.handleSubmit(content, props.username)
        setContent("")
    }


    return (
        <Box component={'div'}>
            {
                isAuthenticated ?
                    <Box component={'form'} onSubmit={onSubmit}>
                        <TextField
                            id="outlined-multiline-static"
                            label="YOUR FLIPR"
                            multiline
                            rows={4}
                            value={content}
                            onChange={onChangeContent}
                            fullWidth
                        />
                        <Button type={"submit"}>flipr IT!</Button>
                    </Box> :
                    ''
            }
        </Box>
    );

}
