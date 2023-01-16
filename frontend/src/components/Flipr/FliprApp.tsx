import FliprGallery from "./FliprGallery";
import useFliprs from "../hooks/useFliprs";
import {Stack} from "@mui/material";
import PostFlipr from "./PostFlipr";

type FliprAppProps = {
    username: string,
}

export default function FliprApp(props: FliprAppProps) {

    const {fliprs, saveFlipr} = useFliprs();

    return (
        <Stack spacing={2}>
            {
                props.username ?
                    <PostFlipr username={props.username} postFlipr={saveFlipr}/> :
                    ''
            }
            <FliprGallery fliprs={fliprs}/>
        </Stack>
    );
}