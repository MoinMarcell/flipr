import FliprGallery from "./FliprGallery";
import {Flipr} from "../Model/Flipr";
import AddFlipr from "./AddFlipr";
import * as React from "react";

type FliprAppProps = {
    fliprs: Flipr[],
    username: string,
    handleDelete: (id: string | undefined) => void,
    searchText: string,
    saveFlipr: (content: string, username: string) => void,
}

export default function FliprApp(props: FliprAppProps){

    return(
        <main>
            <AddFlipr handleSubmit={props.saveFlipr} username={props.username} />
            <FliprGallery searchText={props.searchText} fliprs={props.fliprs} username={props.username} handleDelte={props.handleDelete} />
        </main>
    );

}
