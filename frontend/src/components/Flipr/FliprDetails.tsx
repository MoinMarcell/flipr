import FliprCard from "./FliprCard";
import {useParams} from "react-router-dom";
import useFlipr from "../Hooks/useFlipr";
import {Flipr} from "../Model/Flipr";

type FliprDetailsProps = {
    username: string,
    handleDelete: (id: string | undefined) => void,
    handleLike: (username: string, flipr: Flipr) => void,
}

export default function FliprDetails(props: FliprDetailsProps){

    const params = useParams();

    const id: string | undefined = params.id

    const {flipr} = useFlipr(id)

    return(
        <FliprCard handleLike={props.handleLike} flipr={flipr} username={props.username} handleDelte={props.handleDelete} />
    )
}