import {Flipr} from "../Model/Flipr";
import FliprCard from "./FliprCard";

type FliprGalleryProps = {
    fliprs: Flipr[],
    username: string,
    handleDelte: (id: string | undefined) => void,
    searchText: string,
    handleLike: (username: string, flipr: Flipr) => void,
}

export default function FliprGallery(props: FliprGalleryProps) {

    const fliprCard = props.fliprs.filter((flipr) => flipr.content.toLowerCase().includes(props.searchText) || flipr.author.toLowerCase().includes(props.searchText)).map((flipr) => {
        return <FliprCard handleLike={props.handleLike} flipr={flipr} key={flipr.id} username={props.username} handleDelte={props.handleDelte}/>
    }).reverse();

    return (
        <section>
            {fliprCard}
        </section>
    );

}
