import {Flipr} from "../model/Flipr";
import FliprCard from "./FliprCard";
import {Divider, Stack} from "@mui/material";

type FliprGalleryProps = {
    fliprs: Flipr[],
    username: string,
}

export default function FliprGallery(props: FliprGalleryProps) {
    const fliprCard = props.fliprs.map((flipr) => {
        return <FliprCard username={props.username} flipr={flipr} key={flipr.id}/>
    }).reverse();

    return (
        <Stack
    direction="column"
    divider={<Divider orientation="horizontal" flexItem />}
    spacing={2}
        >
            {fliprCard}
        </Stack>
    );
}