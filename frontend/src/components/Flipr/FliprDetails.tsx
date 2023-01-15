import FliprCard from "./FliprCard";
import {useParams} from "react-router-dom";
import useFlipr from "../Hooks/useFlipr";

type FliprDetailsProps = {
    username: string,
    handleDelete: (id: string) => void,
}

export default function FliprDetails(props: FliprDetailsProps){

    const params = useParams();

    const id: string | undefined = params.id

    const {flipr} = useFlipr(id)

    if(!flipr){
        return (
            <p>Loading...</p>
        )
    }

    return(
        <FliprCard flipr={flipr} username={props.username} handleDelte={props.handleDelete} />
    )
}