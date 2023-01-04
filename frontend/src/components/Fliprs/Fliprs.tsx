import {Flipr} from "../Models/Flipr";
import FliprCard from "./FliprCard";

type FliprsProps = {
    fliprs: Flipr[]
}

const Fliprs = (props: FliprsProps) => {
    const flipr = props.fliprs.map(flipr => {
        return(
            <FliprCard flipr={flipr} key={flipr.id} />
        );
    });

    return(
        <div>
            {flipr}
        </div>
    );
}

export default Fliprs;