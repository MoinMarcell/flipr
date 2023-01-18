import {Alert, Snackbar, SnackbarCloseReason} from "@mui/material";
import React, {SyntheticEvent} from "react";

type TemporarilyFeedbackProps = {
    open: boolean,
    closeSnackbar: (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void,
    closeAlert: (event: SyntheticEvent<Element, Event>) => void,
    severity: "error" | "success",
    messageToShow: string,
    duration: number
}

export default function TemporarilyFeedback(props: TemporarilyFeedbackProps){
    return(
        <Snackbar open={props.open} autoHideDuration={props.duration} onClose={props.closeSnackbar}>
            <Alert onClose={props.closeAlert} severity={props.severity} sx={{width: '100%'}}>
                {props.messageToShow}
            </Alert>
        </Snackbar>
    );
}