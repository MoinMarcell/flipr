import {useEffect, useState} from "react";
import {Flipr} from "../Models/Flipr";
import axios from "axios";
import Fliprs from "./Fliprs";
import AddFlipr from "./AddFlipr";

type FliprAppProps = {
    username: string
}

const FliprsApp = (props: FliprAppProps) => {

    const [fliprs, setFliprs] = useState<Flipr[]>([]);

    const isAuthenticated: boolean = props.username !== 'anonymousUser' && props.username !== undefined && props.username !== null;

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

    function addFlipr(content: string){
        axios.post("/api/fliprs", {
            "content": content,
            "author": props.username
        })
            .then(response => {
                setFliprs(response.data)
            })
            .catch(e => console.error(e));
    }

    return (
        <div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"><i
                    className="fa-solid fa-magnifying-glass"></i></span>
                <input type="text" className="form-control" placeholder="Search" aria-label="Search"
                       aria-describedby="basic-addon1"/>
            </div>

            {isAuthenticated ? <AddFlipr handleContent={addFlipr} /> : ''}

            <Fliprs fliprs={fliprs}/>
        </div>
    );
}

export default FliprsApp;