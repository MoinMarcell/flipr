import {Flipr} from "../model/Flipr";
import FliprCard from "./FliprCard";
import {Grid} from "@mui/material";

type FliprGalleryProps = {
    fliprs: Flipr[],
    username: string,
    deleteFlipr(fliprId: string): Promise<string>,
    likeFlipr(fliprId: string): Promise<string>,
}

export default function FliprGallery(props: FliprGalleryProps) {

    const fliprCard = props.fliprs.map((flipr) => {
        return (
            <FliprCard likeFlipr={props.likeFlipr} deleteFlipr={props.deleteFlipr} username={props.username} flipr={flipr} key={flipr.id}/>
        );
    }).reverse();

    return (
        <Grid component={"main"} spacing={2} container direction={"row"} sx={{mt: 2, xs: 1}} justifyContent={"center"}>
            {fliprCard}
        </Grid>
    );

}
