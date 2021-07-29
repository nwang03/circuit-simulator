import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Particle from "./Particle";

function Home() {
    const history = useHistory();
    function handleClick(path) {
        history.push(`/${path}`);
    }
    return (
        <div id="homePage">
            <h1>Home Page</h1>
            <Button
                variant="primary"
                size="lg"
                onClick={() => {
                    handleClick("RC");
                }}
            >
                RC Circuits
            </Button>{" "}
            <Button
                variant="success"
                size="lg"
                onClick={() => {
                    handleClick("RL");
                }}
            >
                RL Circuits
            </Button>{" "}
            <Button
                variant="danger"
                size="lg"
                onClick={() => {
                    handleClick("LC");
                }}
            >
                LC Circuits
            </Button>
            <Particle />
        </div>
    );
}

export default Home;
