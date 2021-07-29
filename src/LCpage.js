import React, {useEffect} from "react";
import TopMenu from "./TopMenu";

function LCpage() {
    useEffect(() => {
        draw();
    }, []);
    function draw() {
        const canvas = document.getElementById("lc-circuit-canvas");
        const context = canvas.getContext("2d");
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                context.beginPath();
                context.fillStyle =
                    "rgb(0, " +
                    Math.floor(255 - 42.5 * i) +
                    ", " +
                    Math.floor(255 - 42.5 * j) +
                    ")";
                context.arc(
                    250 + j * 100,
                    50 + i * 100,
                    50,
                    0,
                    Math.PI * 2,
                    true
                );
                context.fill();
            }
        }
    }

    return (
        <div>
            <TopMenu />
            <h1 style={{textAlign: "center"}}>LC Circuits</h1>
            <canvas id="lc-circuit-canvas" width="1000" height="500" style={{position: "relative", display: "block", margin: "auto", border: "1px solid black"}}>
            </canvas>
        </div>
    );
}

export default LCpage;
