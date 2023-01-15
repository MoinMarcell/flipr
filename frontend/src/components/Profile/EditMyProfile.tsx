import {ChangeEvent, FormEvent, useCallback, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type EditMyProfileProps = {
    username: string,
    updateUser: (actualUser: string, username: string, password: string) => void,
}

export default function EditMyProfile(props: EditMyProfileProps){

    const [username, setUsername] = useState<string>(props.username);
    const [password, setPassword]= useState<string>("");

    const onChangeUsername = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }, []);

    const onChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.updateUser(props.username, username, password);
    }, [password, props, username])

    return(
        <form onSubmit={onSubmit}>
            <TextField type={"text"} value={username} onChange={onChangeUsername} id="outlined-basic" label="Username" variant="outlined" />
            <TextField type={"password"} value={password} onChange={onChangePassword} id="outlined-basic" label="Password" variant="outlined" />
            <Button type={"submit"}>Update NOW!</Button>
        </form>
    );

}