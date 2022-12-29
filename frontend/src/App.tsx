import "./app.css";
import Navigation from "./components/Navigation/Navigation";
import FliprsApp from "./components/Fliprs/FliprsApp";

const App = () => {
    return (
        <div className={"container-xxl"}>
            <div className={"row"}>
                <div className={"col text-center border-end border-light"}>
                    <Navigation/>
                </div>
                <div className={"col-10"}>
                    <FliprsApp />
                </div>
            </div>
        </div>
    );
}

export default App;
