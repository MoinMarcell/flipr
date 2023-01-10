import {Flipr} from "../Model/Flipr";
import FliprCard from "./FliprCard";

type FliprGalleryProps = {
    fliprs: Flipr[],
    username: string,
    handleDelte: (id: string | undefined) => void
}

export default function FliprGallery(props: FliprGalleryProps) {

    const fliprCard = props.fliprs.map((flipr) => {
        return <FliprCard flipr={flipr} key={flipr.id} username={props.username} handleDelte={props.handleDelte}/>
    }).reverse();

    return (
        <section>
            {fliprCard}
        </section>
    );

}
