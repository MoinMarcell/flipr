import {FliprUser} from "../Models/FliprUser";
import FliprCard from "../Fliprs/FliprCard";

type MyProfileProps = {
    fliprUser: FliprUser
}

const MyProfile = (props: MyProfileProps) => {

    const fliprCard = props.fliprUser.fliprList.map((flipr) => {
        return <FliprCard flipr={flipr} key={flipr.id}/>
    })

    return (
        <div>
            <h2 className={"text-white"}>Hello @{props.fliprUser.username}</h2>
            <h3>My Flippers</h3>
            <div>
                {fliprCard}
            </div>
        </div>
    );
}

export default MyProfile;