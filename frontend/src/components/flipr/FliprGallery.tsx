import {Flipr} from "../model/Flipr";
import FliprCard from "./FliprCard";
import {Grid} from "@mui/material";

type FliprGalleryProps = {
    fliprs: Flipr[],
    username: string,
    deleteFlipr(fliprId: string): Promise<string>,
}

export default function FliprGallery(props: FliprGalleryProps) {

    const fliprCard = props.fliprs.map((flipr) => {
        return (
            <FliprCard deleteFlipr={props.deleteFlipr} username={props.username} flipr={flipr} key={flipr.id}/>
        );
    }).reverse();

    return (
            <Grid component={"main"} container direction={"row"} sx={{xs: 1, md: 4, lg: 8}}>
                {fliprCard}
            </Grid>
    );

}
