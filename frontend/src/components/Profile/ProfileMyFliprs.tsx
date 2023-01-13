import AddFlipr from "../Flipr/AddFlipr";
import * as React from "react";
import {Flipr} from "../Model/Flipr";
import FliprCard from "../Flipr/FliprCard";
import FliprSkeleton from "../Skeleton/FliprSkeleton";

type ProfileMyFliprsProps = {
    username: string,
    saveFlipr: (content: string, author: string) => void,
    fliprs: Flipr[],
    handleDelete: (id: string | undefined) => void,
}

export default function ProfileMyFliprs(props: ProfileMyFliprsProps) {

    const fliprCard = props.fliprs.filter((flipr) => flipr.author === props.username).map((flipr) => {
        return <FliprCard flipr={flipr} username={props.username} handleDelte={props.handleDelete} key={flipr.id} />
    }).reverse()

    return (
        <div>
            <AddFlipr handleSubmit={props.saveFlipr} username={props.username}/>
            {
                props.username && props.username !== 'anonymousUser' ?
                    fliprCard :
                    <FliprSkeleton />
            }
        </div>
    );
}