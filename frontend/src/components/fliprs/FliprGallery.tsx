import * as React from 'react';
import List from '@mui/material/List';
import {Flipr} from "../models/Flipr";
import FliprCard from "./FliprCard";

type FliprGalleryProps = {
    fliprs: Flipr[]
}

const FliprGallery = (props: FliprGalleryProps) => {
    const fliprCards = props.fliprs.map((flipr) => {
        return(
            <FliprCard flipr={flipr} key={flipr.id} />
        )
    })

    return(
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {fliprCards}
            </List>
    );
}

export default FliprGallery;