import {Flipr} from "../Models/Flipr";

type FliprProps = {
    flipr: Flipr
}

const FliprCard = (props: FliprProps) => {
    return (
        <div className="card mb-2">
            <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                 className="card-img-top" alt="..."/>
            <div className="card-body">
                <p className="card-text">{props.flipr.content}</p>
            </div>
            <div className={"card-footer"}>
                <div className={"row text-center"}>
                    <div className={"col"}>
                        <button className={"btn"}>
                            postet 2h ago by {props.flipr.author.username}
                        </button>
                    </div>
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