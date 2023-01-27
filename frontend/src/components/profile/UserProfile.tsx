import useUser from "../hooks/useUser";
import React from "react";

type UserProfileProps = {
    username: string,
}
export default function UserProfile(props: UserProfileProps){

    const {user} = useUser(props.username);

    return(
        <h1>Welcome back, {user.username}</h1>
    );
}