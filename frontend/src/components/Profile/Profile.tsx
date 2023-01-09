import FliprCard from "../Flipr/FliprCard";
import {Flipr} from "../Model/Flipr";

type ProfileProps = {
    username: string,
    fliprs: Flipr[],
    handleDelete: (id: string | undefined) => void
}

export default function Profile(props: ProfileProps) {

    const fliprCard = props.fliprs.filter((flipr) => flipr.author === props.username).map((flipr) => {
        return <FliprCard flipr={flipr} key={flipr.id} username={props.username} handleDelte={props.handleDelete} />
    });

    return (
        <section>
            <h3>Your fliprs</h3>
            {
                props.username !== 'anonymousUser' && props.username ?
                     fliprCard:
                    <h2>Loading...</h2>
            }
        </section>
    );

}
