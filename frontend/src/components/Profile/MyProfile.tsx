type MyProfileProps = {
    username: string
}

const MyProfile = (props: MyProfileProps) => {
    return (
        <h2 className={"text-white"}>Hello @{props.username}</h2>
    );
}

export default MyProfile;