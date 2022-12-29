import {Flipr} from "../Models/Flipr";

type FliprProps = {
    flipr: Flipr
}

const FliprCard = (props: FliprProps) => {
    return (
        <div className="card mb-2">
            <div className={"card-header"}>
                <div className={"row"}>
                    <div className={"col-1 p-0 text-end"}>
                        <i className="fa-solid fa-circle-user fa-2xl"></i>
                    </div>
                    <div className={"col text-start p-0 px-1"}>
                        <h6>postet 2h ago by {props.flipr.author.username}</h6>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">{props.flipr.content}</p>
            </div>
            <div className={"card-footer"}>
                <div className={"row text-center"}>
                    <div className={"col"}>
                        <div>
                            <button className={"btn"}><i className="fa-solid fa-share"></i></button>
                        </div>
                    </div>
                    <div className={"col"}>
                        <div>
                            <button className={"btn"}><i className="fa-solid fa-comments"></i></button>
                        </div>
                    </div>
                    <div className={"col"}>
                        <div>
                            <button className={"btn"}><i className="fa-regular fa-heart"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FliprCard;