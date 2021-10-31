import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Particle from "./Particle";

function Home() {
    let requestID,
        offsetChange = 0,
        graphType = "RC";
    // const [graphType, setGraphType] = useState("RC");
    // useEffect(() => {
    //     switch (graphType) {
    //         case "RC":
    //             drawRC();
    //             break;
    //         case "RL":
    //             drawRL();
    //             break;
    //     }
    // }, [graphType]);

    useEffect(() => {
        drawRC();
    }, []);

    const history = useHistory();
    function handleClick(path) {
        history.push(`/${path}`);
    }
    function drawRC() {
        graphType = "RC";

        const canvas = document.getElementById("homePageLayer1");
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.lineWidth = 5;
        context.strokeStyle = "rgb(83, 104, 144, 0.5)";
        context.strokeRect(100, 50, 1000, 500);

        context.clearRect(95, 250, 10, 100);
        context.clearRect(1095, 200, 10, 200);
        context.clearRect(400, 45, 400, 10);

        context.beginPath();
        context.lineJoin = "miter";
        context.moveTo(400, 50);
        for (let i = 0; i < 10; i++) {
            let j = i % 2 ? -1 : 1;
            context.lineTo(400 + i * 40 + 20, 50 + 50 * j);
            context.lineTo(400 + i * 40 + 40, 50);
        }
        context.stroke();

        context.fillStyle = "rgb(83, 104, 144, 0.5)";
        context.fillRect(50, 250, 100, 5);
        context.fillRect(62.5, 350, 75, 5);
        context.fillRect(1000, 200, 200, 5);
        context.fillRect(1000, 400, 200, 5);

        offsetChange = 5;
    }

    function drawRL() {
        graphType = "RL";

        const canvas = document.getElementById("homePageLayer1");
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.lineWidth = 5;
        context.strokeStyle = "rgb(83, 104, 144, 0.5)";
        context.strokeRect(100, 50, 1000, 500);

        context.clearRect(95, 250, 10, 100);
        context.clearRect(1095, 150, 10, 300);
        context.clearRect(400, 45, 400, 10);

        context.beginPath();
        context.lineJoin = "miter";
        context.moveTo(400, 50);
        for (let i = 0; i < 10; i++) {
            let j = i % 2 ? -1 : 1;
            context.lineTo(400 + i * 40 + 20, 50 + 50 * j);
            context.lineTo(400 + i * 40 + 40, 50);
        }
        context.stroke();

        context.fillStyle = "rgb(83, 104, 144, 0.5)";
        context.fillRect(50, 250, 100, 5);
        context.fillRect(62.5, 350, 75, 5);

        context.beginPath();
        context.lineJoin = "round";
        context.moveTo(1000, 150);
        for (let i = 0; i < 5; i++) {
            context.beginPath();
            context.arc(
                1100,
                187.5 + i * 56.25,
                75 / 2,
                -Math.PI / 2,
                Math.PI / 2
            );
            context.stroke();
        }
        for (let i = 0; i < 4; i++) {
            context.beginPath();
            context.ellipse(
                1100,
                215.625 + i * 56.25,
                37.5,
                18.75 / 2,
                Math.PI,
                Math.PI / 2,
                (3 * Math.PI) / 2,
                true
            );
            context.stroke();
        }

        offsetChange = 0.2;
    }

    function drawLC() {
        graphType = "LC";

        const canvas = document.getElementById("homePageLayer1");
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.lineWidth = 5;
        context.strokeStyle = "rgb(83, 104, 144, 0.5)";
        context.strokeRect(100, 50, 1000, 500);

        context.clearRect(95, 150, 10, 300);
        context.clearRect(1095, 200, 10, 200);

        context.beginPath();
        context.lineJoin = "round";
        context.moveTo(1000, 150);
        for (let i = 0; i < 5; i++) {
            context.beginPath();
            context.arc(
                100,
                187.5 + i * 56.25,
                75 / 2,
                -Math.PI / 2,
                Math.PI / 2
            );
            context.stroke();
        }
        for (let i = 0; i < 4; i++) {
            context.beginPath();
            context.ellipse(
                100,
                215.625 + i * 56.25,
                37.5,
                18.75 / 2,
                Math.PI,
                Math.PI / 2,
                (3 * Math.PI) / 2,
                true
            );
            context.stroke();
        }

        context.fillStyle = "rgb(83, 104, 144, 0.5)";

        context.fillRect(1000, 200, 200, 5);
        context.fillRect(1000, 400, 200, 5);

        offsetChange = 0;
    }

    function animate() {
        const canvas = document.getElementById("homePageLayer2");
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.setLineDash([0, 50]);
        context.lineCap = "round";
        context.lineWidth = 15;
        context.strokeStyle = "rgb(83, 104, 144, 0.5)";

        switch (graphType) {
            case "RC":
                if (offsetChange > 0.2) offsetChange -= 0.01;
                break;
            case "RL":
                if (offsetChange < 5) offsetChange += 0.01;
                break;
            case "LC":
                if (offsetChange > Math.PI * 2) offsetChange = 0;
                offsetChange += 0.01;
                break;
        }
        if (graphType === "LC")
            context.lineDashOffset += 5 * Math.cos(offsetChange);
        else context.lineDashOffset += offsetChange;

        context.strokeRect(100, 50, 1000, 500);
        if (graphType !== "RL") context.clearRect(1092.5, 205, 15, 195);

        requestID = requestAnimationFrame(animate);
    }

    return (
        <div>
            <canvas
                className="homePageCanvas"
                id="homePageLayer1"
                width="1200"
                height="600"
            ></canvas>
            <canvas
                className="homePageCanvas"
                id="homePageLayer2"
                width="1200"
                height="600"
            ></canvas>
            <div id="homePage">
                <h1>Circuit Simulator</h1>
                <h3 style={{ color: "lightGray" }}>
                    A website for simulating RC, RL, and LC circuits using
                    Javascript.
                </h3>
                <br />
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                        window.cancelAnimationFrame(requestID);
                        handleClick("RC");
                    }}
                    onMouseEnter={() => {
                        // setGraphType("RC");

                        drawRC();
                        animate();
                    }}
                    onMouseLeave={() => {
                        window.cancelAnimationFrame(requestID);
                    }}
                >
                    RC Circuits
                </Button>{" "}
                <Button
                    variant="success"
                    size="lg"
                    onClick={() => {
                        window.cancelAnimationFrame(requestID);
                        handleClick("RL");
                    }}
                    onMouseEnter={() => {
                        // setGraphType("RL");

                        drawRL();
                        animate();
                    }}
                    onMouseLeave={() => {
                        window.cancelAnimationFrame(requestID);
                    }}
                >
                    RL Circuits
                </Button>{" "}
                <Button
                    variant="danger"
                    size="lg"
                    onClick={() => {
                        window.cancelAnimationFrame(requestID);
                        handleClick("LC");
                    }}
                    onMouseEnter={() => {
                        drawLC();
                        animate();
                    }}
                    onMouseLeave={() => {
                        window.cancelAnimationFrame(requestID);
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
