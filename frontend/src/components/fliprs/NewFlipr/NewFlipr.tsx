import {Button, TextField} from "@mui/material";

const NewFlipr = () => {
    return (
        <div>
            <TextField
                id="outlined-multiline-static"
                label="Your flipr"
                multiline
                rows={4}
                fullWidth
            />
            <Button variant="contained" sx={{mt: 1}}>Contained</Button>
        </div>
    )
}

export default NewFlipr;