import FliprGallery from "./FliprGallery";
import useFliprs from "../hooks/useFliprs";
import NewFlipr from "./NewFlipr/NewFlipr";
import {Container} from "@mui/material";

export default function FliprApp() {

    const {fliprs, saveFlipr} = useFliprs()

    return (
        <Container sx={{mt: 1}}>
            <NewFlipr content={saveFlipr}/>
            <FliprGallery fliprs={fliprs}/>
        </Container>
    )
}