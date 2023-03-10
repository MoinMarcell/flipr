import {Flipr} from "../models/Flipr";
import FliprCard from "./FliprCard";
import {Grid} from "@mui/material";
import PostFlipr from "./PostFlipr";
import {FliprDTO} from "../models/FliprDTO";

type FliprGalleryProps = {
    fliprs: Flipr[],
    username: string,
    isAuthenticated: boolean,
    addFliprToFavorites(username: string, fliprId: string): Promise<unknown>,
    isLikedFlipr(username: string, fliprId: string): Promise<unknown>,
    deleteFlipr(fliprId: string): Promise<unknown>,
    saveFlipr(fliprToSave: FliprDTO): Promise<unknown>,
}
export default function FliprGallery(props: FliprGalleryProps) {
    const fliprCard = props.fliprs.map((flipr) => {
        return <FliprCard deleteFlipr={props.deleteFlipr} isLikedFlipr={props.isLikedFlipr}
                          addFliprToFavorites={props.addFliprToFavorites} username={props.username}
                          isAuthenticated={props.isAuthenticated} flipr={flipr} key={flipr.id}/>
    }).reverse();

    return (
        <Grid container spacing={2} justifyContent={"center"} sx={{mt: '1%'}}>
            {
                props.isAuthenticated ?
                    <Grid item sx={{width: '95%'}}>
                        <PostFlipr saveFlipr={props.saveFlipr} author={props.username}/>
                    </Grid>:
                    ''
            }
            {fliprCard}
        </Grid>
    );
}