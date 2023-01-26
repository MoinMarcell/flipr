import {useParams} from "react-router";
import useUser from "../hooks/useUser";

export default function PublicProfile() {

    const params = useParams();
    const username: string | undefined = params.username;

    const {user} = useUser(username);

    return (
        <div>
            <h1>This is the Profile of @{user.username}</h1>
            <p>Total Fliprs: {user.fliprs.length}</p>
        </div>
    );
}