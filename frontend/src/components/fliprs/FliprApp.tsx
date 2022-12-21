import FliprGallery from "./FliprGallery";
import useFliprs from "../hooks/useFliprs";

export default function FliprApp() {

    const {fliprs} = useFliprs()

    return (
        <div>
            <FliprGallery fliprs={fliprs}/>
        </div>
    )
}