import {Flipr} from "../model/Flipr";
import {Box} from "@mui/material";
import FliprGallery from "./FliprGallery";
import FliprPost from "./FliprPost";
import {CommentDTO} from "../model/FliprDTO";

type FliprAppProps = {
    fliprs: Flipr[],
    username: string,
    saveFlipr(fliprToSave: CommentDTO): Promise<Flipr>,
    deleteFlipr(fliprId: string): Promise<string>,
}

export default function FliprApp(props: FliprAppProps){

    return(
        <Box>
            <FliprPost saveFlipr={props.saveFlipr} author={props.username} />
            <FliprGallery deleteFlipr={props.deleteFlipr} username={props.username} fliprs={props.fliprs} />
        </Box>
    );

}
