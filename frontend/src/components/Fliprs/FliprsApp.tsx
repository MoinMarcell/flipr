import {useEffect, useState} from "react";
import {Flipr} from "../Models/Flipr";
import axios from "axios";
import Fliprs from "./Fliprs";

const FliprsApp = () => {

    const [fliprs, setFliprs] = useState<Flipr[]>([]);

    useEffect(() => {
        getFliprs();
    }, [])

    function getFliprs() {
        axios.get("/api/fliprs")
            .then(response => {
                setFliprs(response.data);
            })
            .catch(e => console.error(e));
    }

    return (
        <div>
            <div className="input-group mb-3 mt-3">
                <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-magnifying-glass"></i></span>
                <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
            </div>

            <Fliprs fliprs={fliprs}/>
        </div>
);
}

export default FliprsApp;