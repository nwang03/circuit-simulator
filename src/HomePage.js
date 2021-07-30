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
        <div>
            <div id="homePage">
                <h1>Circuit Simulator</h1>
                <h3 style={{color: "lightGray"}}>A website for simulating RC, RL, and LC circuits using Javascript.</h3>
                <br />
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
            </div>
            <Particle />
        </div>
    );
}

export default Home;
