import FliprGallery from "./FliprGallery";
import useFliprs from "../hooks/useFliprs";
import NewFlipr from "./NewFlipr/NewFlipr";
import {Container} from "@mui/material";

const FliprApp = () => {

    const {fliprs, saveFlipr} = useFliprs()

    return (
        <Container sx={{mt: 3}}>
            <NewFlipr content={saveFlipr}/>
            <FliprGallery fliprs={fliprs}/>
        </Container>
    )
}

export default FliprApp;