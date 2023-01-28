import {Flipr} from "../model/Flipr";
import FliprCard from "./FliprCard";
import {Box} from "@mui/material";

type FliprGalleryProps = {
    fliprs: Flipr[],
    username: string,
}

export default function FliprGallery(props: FliprGalleryProps) {

    const fliprCard = props.fliprs.map((flipr) => {
        return (
            <FliprCard username={props.username} flipr={flipr} key={flipr.id} />
        );
    });

    return(
        <Box component={"main"}>
            {fliprCard}
        </Box>
    );

}
