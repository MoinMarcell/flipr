import FliprGallery from "./FliprGallery";
import useFliprs from "../api/useFliprs";

export default function FliprApp(){

    const {fliprs} = useFliprs()

    return(
        <FliprGallery fliprs={fliprs} />
    )
}