import React, { useEffect } from "react";
import TopMenu from "./TopMenu";

function RLpage() {
    let red = 0;
    let increment = 1;
    useEffect(() => {
        draw();
    }, []);
    function draw() {
        const canvas = document.getElementById("rl-circuit-canvas");
        const context = canvas.getContext("2d");
        red += increment
        if(red > 255 && increment === 1){
            increment = -1;
            red = 255;
        }
        if(red < 0 && increment === -1){
            increment = 1;
            red = 0;
        }
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                let green = Math.floor(255 - 42.5 * i);
                let blue = Math.floor(255 - 42.5 * j);
                context.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
                context.fillRect(j * 200, i * 75, 200, 75);
            }
        }
        requestAnimationFrame(draw);
    }

    return (
        <div>
            <TopMenu />
            <h1 style={{ textAlign: "center" }}>RL Circuits</h1>
            <canvas
                id="rl-circuit-canvas"
                width="1000"
                height="500"
                style={{
                    position: "relative",
                    display: "block",
                    margin: "auto",
                    border: "1px solid black",
                }}
            ></canvas>
        </div>
    );
}

export default RLpage;
