import {Flipr} from "../model/Flipr";
import {Box} from "@mui/material";
import FliprGallery from "./FliprGallery";

type FliprAppProps = {
    fliprs: Flipr[],
    username: string,
}

export default function FliprApp(props: FliprAppProps){

    return(
        <Box>
            <FliprGallery username={props.username} fliprs={props.fliprs} />
        </Box>
    );

}
