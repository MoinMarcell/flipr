import FliprGallery from "./FliprGallery";
import {Flipr} from "../Model/Flipr";

type FliprAppProps = {
    fliprs: Flipr[],
    username: string,
    handleDelete: (id: string | undefined) => void,
    searchText: string,
}

export default function FliprApp(props: FliprAppProps){

    return(
        <main>
            <FliprGallery searchText={props.searchText} fliprs={props.fliprs} username={props.username} handleDelte={props.handleDelete} />
        </main>
    );

}
