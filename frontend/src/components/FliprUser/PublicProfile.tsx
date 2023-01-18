import useUser from "../hooks/useUser";
import {useParams} from "react-router-dom";
import FliprCard from "../Flipr/FliprCard";
import {Divider, Skeleton, Stack} from "@mui/material";

export default function PublicProfile(){

    const params = useParams();
    const username: string | undefined = params.username
    const {user, isLoading} = useUser(username);

    const fliprCard = user.fliprs.map((flipr) => {
        return <FliprCard flipr={flipr} key={flipr.id} />;
    }).reverse();

    return (
        <div>
            <h1>Profile of {user.username}</h1>
            <Stack
                direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={2}
            >
                {!isLoading && fliprCard}
                {isLoading && <Stack spacing={1}>
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="rounded" width={210} height={60} />
                </Stack>}
            </Stack>
        </div>
    );
}