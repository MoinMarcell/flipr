import {Flipr} from "../model/Flipr";
import FliprCard from "./FliprCard";
import {Divider, Stack} from "@mui/material";

type FliprGalleryProps = {
    fliprs: Flipr[],
}

export default function FliprGallery(props: FliprGalleryProps) {
    const fliprCard = props.fliprs.map((flipr) => {
        return <FliprCard flipr={flipr} key={flipr.id}/>
    }).reverse();

    return (
        <Stack direction='column'
               spacing={{ xs: 1, sm: 2, md: 2 }}
               divider={<Divider orientation="horizontal" flexItem />}>
            {fliprCard}
        </Stack>
    );
}