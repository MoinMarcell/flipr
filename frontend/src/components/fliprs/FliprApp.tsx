import FliprGallery from "./FliprGallery";
import useFliprs from "../hooks/useFliprs";
import NewFlipr from "./NewFlipr/NewFlipr";
import {Container} from "@mui/material";

const FliprApp = () => {

    const {fliprs, saveFlipr} = useFliprs()

    return (
        <Container sx={{mt: 10}}>
            <NewFlipr onSaveFlipr={saveFlipr}/>
            <FliprGallery fliprs={fliprs}/>
        </Container>
    )
}

export default FliprApp;