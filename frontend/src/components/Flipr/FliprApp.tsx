import FliprGallery from "./FliprGallery";
import {Flipr} from "../Model/Flipr";

type FliprAppProps = {
    fliprs: Flipr[],
    username: string,
    handleDelete: (id: string | undefined) => void
}

export default function FliprApp(props: FliprAppProps){

    return(
        <main>
            <FliprGallery fliprs={props.fliprs} username={props.username} handleDelte={props.handleDelete} />
        </main>
    );

}
