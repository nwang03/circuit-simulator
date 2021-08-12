import React, { useState, useEffect } from "react";
import TopMenu from "./TopMenu";
import Button from "react-bootstrap/Button";

function LCpage() {
    let time = 0,
        paused = true,
        graphReset = 0,
        requestID;
    const [timeChange, setTimeChange] = useState(1);
    const [capacitance, setCapacitance] = useState(
        10 /* hard-coded default value */
    );
    const [inductance, setInductance] = useState(
        10 /* hard-coded default value */
    );
    const [maxCapacitorCharge, setMaxCapacitorCharge] = useState(
        10 /* hard-coded default value */
    );
    const [graphType, setGraphType] = useState("current");
    const [maxCurrent, setMaxCurrent] = useState(
        calculateAngularFrequency() * maxCapacitorCharge
    );
    const [maxElectricFieldEnergy, setMaxElectricFieldEnergy] = useState(
        Math.pow(maxCapacitorCharge, 2) / (2 * capacitance)
    );
    const [maxMagneticFieldEnergy, setMaxMagneticFieldEnergy] = useState(
        (inductance / 2) * Math.pow(maxCurrent, 2)
    );
    const [max, setMax] = useState(maxCurrent);
    const [timeRange, setTimeRange] = useState(450);

    useEffect(() => {
        draw();
        animate();
        initGraph();
    }, [
        graphType,
        timeChange,
        capacitance,
        inductance,
        maxCapacitorCharge,
        timeRange,
    ]);

    function handleChange(event) {
        const { name, value, type } = event.target;
        if (type === "radio") {
            setGraphType(value);
            switch (value) {
                case "current":
                    setMax(maxCurrent);
                    break;
                case "charge":
                    setMax(maxCapacitorCharge);
                    break;
                case "electricFieldEnergy":
                    setMax(maxElectricFieldEnergy);
                    break;
                case "magneticFieldEnergy":
                    setMax(maxMagneticFieldEnergy);
                    break;
                default:
                    setMax(maxCurrent);
            }
        } else if (name === "timeChange") {
            setTimeChange(parseInt(value));
        } else if (name === "charge") {
            if (
                Number.isNaN(parseFloat(value)) ||
                !isFinite(value) ||
                value === maxCapacitorCharge
            )
                return;
            setMaxCapacitorCharge(value);
            setMaxCurrent((1 / Math.sqrt(inductance * capacitance)) * value);
            setMaxElectricFieldEnergy(Math.pow(value, 2) / (2 * capacitance));
            setMaxMagneticFieldEnergy(
                (inductance *
                    Math.pow(
                        (1 / Math.sqrt(inductance * capacitance)) * value,
                        2
                    )) /
                    2
            );
            switch (graphType) {
                case "current":
                    setMax((1 / Math.sqrt(inductance * capacitance)) * value);
                    break;
                case "charge":
                    setMax(value);
                    break;
                case "electricFieldEnergy":
                    setMax(Math.pow(value, 2) / (2 * capacitance));
                    break;
                case "magneticFieldEnergy":
                    setMax(
                        (inductance *
                            Math.pow(
                                (1 / Math.sqrt(inductance * capacitance)) *
                                    value,
                                2
                            )) /
                            2
                    );
                    break;
                default:
                    setMax((1 / Math.sqrt(inductance * capacitance)) * value);
            }
        } else if (name === "capacitance") {
            if (
                Number.isNaN(parseFloat(value)) ||
                !isFinite(value) ||
                value === capacitance
            )
                return;
            setCapacitance(value);
            setMaxCurrent(
                (1 / Math.sqrt(inductance * value)) * maxCapacitorCharge
            );
            setMaxElectricFieldEnergy(
                Math.pow(maxCapacitorCharge, 2) / (2 * value)
            );
            setMaxMagneticFieldEnergy(
                (inductance *
                    Math.pow(
                        (1 / Math.sqrt(inductance * value)) *
                            maxCapacitorCharge,
                        2
                    )) /
                    2
            );
            switch (graphType) {
                case "current":
                    setMax(
                        (1 / Math.sqrt(inductance * value)) * maxCapacitorCharge
                    );
                    break;
                case "charge":
                    setMax(maxCapacitorCharge);
                    break;
                case "electricFieldEnergy":
                    setMax(Math.pow(maxCapacitorCharge, 2) / (2 * value));
                    break;
                case "magneticFieldEnergy":
                    setMax(
                        (inductance *
                            Math.pow(
                                (1 / Math.sqrt(inductance * value)) *
                                    maxCapacitorCharge,
                                2
                            )) /
                            2
                    );
                    break;
                default:
                    setMax(
                        (1 / Math.sqrt(inductance * value)) * maxCapacitorCharge
                    );
            }
        } else if (name === "inductance") {
            if (
                Number.isNaN(parseFloat(value)) ||
                !isFinite(value) ||
                value === inductance
            )
                return;
            setInductance(value);
            setMaxCurrent(
                (1 / Math.sqrt(value * capacitance)) * maxCapacitorCharge
            );
            setMaxElectricFieldEnergy(
                Math.pow(maxCapacitorCharge, 2) / (2 * capacitance)
            );
            setMaxMagneticFieldEnergy(
                (value *
                    Math.pow(
                        (1 / Math.sqrt(value * capacitance)) *
                            maxCapacitorCharge,
                        2
                    )) /
                    2
            );
            switch (graphType) {
                case "current":
                    setMax(
                        (1 / Math.sqrt(value * capacitance)) *
                            maxCapacitorCharge
                    );
                    break;
                case "charge":
                    setMax(maxCapacitorCharge);
                    break;
                case "electricFieldEnergy":
                    setMax(Math.pow(maxCapacitorCharge, 2) / (2 * capacitance));
                    break;
                case "magneticFieldEnergy":
                    setMax(
                        (value *
                            Math.pow(
                                (1 / Math.sqrt(value * capacitance)) *
                                    maxCapacitorCharge,
                                2
                            )) /
                            2
                    );
                    break;
                default:
                    setMax(
                        (1 / Math.sqrt(value * capacitance)) *
                            maxCapacitorCharge
                    );
            }
        } else if (name === "timeRange") {
            clearGraph();
            setTimeRange(parseInt(value));
        }
        window.cancelAnimationFrame(requestID);
        paused = true;
        document
            .getElementById("top-layer")
            .getContext("2d").lineDashOffset = 0;
        clearGraph();
    }

    function draw() {
        const canvas = document.getElementById("bottom-layer");
        const context = canvas.getContext("2d");

        // draw background color
        context.fillStyle = "rgb(255, 255, 237)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // draw circuit sqaure
        context.lineWidth = 5;
        context.strokeStyle = "rgb(211, 211, 211)";
        context.strokeRect(50, 50, 400, 400);

        // clear gaps for inductor and capacitor
        context.fillStyle = "rgb(255, 255, 237)";
        context.fillRect(45, 143, 10, 214);
        context.fillRect(440, 200, 20, 100);

        // draw inductor
        context.beginPath();
        context.lineJoin = "round";
        context.moveTo(170, 50);
        for (let i = 0; i < 5; i++) {
            context.beginPath();
            context.arc(50, 170 + 40 * i, 30, Math.PI * 0.5, Math.PI * 1.5, 1);
            context.stroke();
        }
        for (let i = 0; i < 4; i++) {
            context.beginPath();
            context.ellipse(
                50,
                190 + i * 40,
                30,
                10,
                0,
                Math.PI * 0.5,
                Math.PI * 1.5,
                false
            );
            context.stroke();
        }

        // draw graph
        context.fillStyle = "rgb(224, 248, 248)";
        context.fillRect(600, 50, 450, 400);
        context.strokeStyle = "black";
        context.lineWidth = 0.5;
        context.strokeRect(600, 50, 450, 400);
        for (let i = 1; i <= 8; i++) {
            context.beginPath();
            context.moveTo(600 + 50 * i, 50);
            context.lineTo(600 + 50 * i, 450);
            context.stroke();
        }
        for (let i = 1; i <= 7; i++) {
            context.beginPath();
            context.moveTo(600, 50 + 50 * i);
            context.lineTo(1050, 50 + 50 * i);
            context.stroke();
        }
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(600, 50);
        context.lineTo(600, 450);
        context.stroke();
        context.moveTo(600, 250);
        context.lineTo(1050, 250);
        context.stroke();
        context.beginPath();
        context.fillStyle = "black";
        context.font = "20px serif";
        context.fillText(0, 580, 250);

        clearXAxis();
        clearYAxis();
        drawXAxis();
        drawYAxis();
    }

    function animate() {
        const canvas = document.getElementById("top-layer");
        const context = canvas.getContext("2d");

        // reset canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw current
        context.setLineDash([0, 50]);
        context.lineCap = "round";
        context.lineWidth = 15;
        if (!paused) {
            context.lineDashOffset += calculateCurrent();
            time += timeChange;
        }
        context.strokeStyle = "rgb(135, 206, 235)";
        context.strokeRect(50, 50, 400, 400);
        context.setLineDash([]);
        context.lineCap = "butt";

        context.fillStyle = "rgb(255, 255, 237)";
        context.fillRect(440, 200, 20, 100);

        // draw capacitor
        context.fillStyle = "rgb(0, 0, 225)";
        context.fillRect(400, 290, 100, 10);
        context.fillStyle = "rgb(255, 0, 0)";
        context.fillRect(400, 200, 100, 10);

        graph();

        requestID = requestAnimationFrame(animate);
    }

    function initGraph() {
        const canvas = document.getElementById("graph-layer");
        const context = canvas.getContext("2d");
        time = 0;
        context.beginPath();
        context.strokeStyle = "rgb(0, 0, 255)";
        context.lineWidth = 5;

        let yValue;
        switch (graphType) {
            case "current":
                yValue = calculateCurrent();
                break;
            case "charge":
                yValue = calculateCharge();
                break;
            case "electricFieldEnergy":
                yValue = calculateElectricFieldEnergy();
                break;
            case "magneticFieldEnergy":
                yValue = calculateMagneticFieldEnergy();
                break;
            default:
                yValue = calculateCurrent();
        }

        context.moveTo(
            600 + time,
            250 - (yValue * 200) / Math.abs(max) // graph
        );
        graphReset = 0;
        drawYAxis();
    }

    function graph() {
        const context = document.getElementById("graph-layer").getContext("2d");
        let yValue;
        switch (graphType) {
            case "current":
                yValue = calculateCurrent();
                break;
            case "charge":
                yValue = calculateCharge();
                break;
            case "electricFieldEnergy":
                yValue = calculateElectricFieldEnergy();
                break;
            case "magneticFieldEnergy":
                yValue = calculateMagneticFieldEnergy();
                break;
            default:
                yValue = calculateCurrent();
        }
        context.fillStyle = "rgb(255, 255, 237)";
        context.fillRect(0, 480, 1100, 100);
        context.fillRect(
            160,
            85,
            context.measureText(inductance + " H").width,
            40
        );
        context.fillRect(
            375,
            235,
            context.measureText(capacitance + " C").width,
            40
        );
        context.fillStyle = "rgb(0, 0, 139)";
        context.font = "20px serif";
        context.fillText(
            "Max Capacitor Charge: " + maxCapacitorCharge + " coulombs",
            50,
            500
        );
        context.fillText("Capacitance: " + capacitance + " farads", 50, 525);
        context.fillText("Inductance: " + inductance + " henries", 50, 550);
        context.fillText(
            "Cycle Period: " +
                ((2 * Math.PI) / calculateAngularFrequency()).toFixed(2) +
                " seconds",
            50,
            575
        );
        context.fillStyle = "rgb(0, 100, 0)";
        context.font = "40px serif";
        context.fillText(inductance + " H", 100, 270);
        context.fillText(capacitance + " F", 375, 270);
        context.fillStyle = "rgb(255, 0, 255)";
        context.font = "20px serif";
        context.fillText(
            "Current: " + calculateCurrent().toFixed(2) + " amps",
            400,
            500
        );
        context.fillText(
            "Electric Field Energy: " +
                calculateElectricFieldEnergy().toFixed(2) +
                " joules",
            400,
            525
        );
        context.fillText(
            "Magnetic Field Energy: " +
                calculateMagneticFieldEnergy().toFixed(2) +
                " joules",
            400,
            550
        );
        context.fillText(
            "Total Energy: " + maxElectricFieldEnergy.toFixed(2) + " joules",
            400,
            575
        );
        context.fillStyle = "rgb(148, 0, 211)";
        context.fillText("X-axis: " + time + " seconds", 800, 500);
        context.fillText("Y-axis: " + graphType, 800, 525);
        context.fillText(
            "Max Current: " + maxCurrent.toFixed(2) + " amps",
            800,
            550
        );
        context.fillText(
            "Max Charge: " +
                parseFloat(maxCapacitorCharge).toFixed(2) +
                " coulombs",
            800,
            575
        );
        // max electric and magnetic energies
        let resetNumber;
        switch (timeRange) {
            case 50:
                switch (timeChange) {
                    case 3:
                    case 4:
                    case 6:
                    case 8:
                        resetNumber = 48;
                        break;
                    case 7:
                        resetNumber = 49;
                        break;
                    case 9:
                        resetNumber = 45;
                        break;
                    default:
                        resetNumber = 50;
                }
                break;
            case 100:
                switch (timeChange) {
                    case 3:
                    case 9:
                        resetNumber = 99;
                        break;
                    case 6:
                    case 8:
                        resetNumber = 96;
                        break;
                    case 7:
                        resetNumber = 98;
                        break;
                    default:
                        resetNumber = 100;
                }
                break;
            case 450:
                switch (timeChange) {
                    case 4:
                    case 7:
                    case 8:
                        resetNumber = 448;
                        break;
                    default:
                        resetNumber = 450;
                        break;
                }
                break;
            case 1000:
                switch (timeChange) {
                    case 3:
                    case 9:
                        resetNumber = 999;
                        break;
                    case 6:
                        resetNumber = 996;
                        break;
                    case 7:
                        resetNumber = 994;
                        break;
                    default:
                        resetNumber = 1000;
                }
                break;
            case 5000:
                switch (timeChange) {
                    case 3:
                    case 6:
                    case 7:
                        resetNumber = 4998;
                        break;
                    case 9:
                        resetNumber = 4995;
                        break;
                    default:
                        resetNumber = 5000;
                }
                break;
            case 10000:
                switch (timeChange) {
                    case 3:
                    case 9:
                        resetNumber = 9999;
                        break;
                    case 6:
                    case 7:
                        resetNumber = 9996;
                        break;
                    default:
                        resetNumber = 10000;
                }
                break;
            default:
        }
        if (time % resetNumber === 0 && !paused && timeChange !== 0) {
            context.moveTo(600, 250 - (yValue * 200) / Math.abs(max)); // graph
            clearGraph();
            context.beginPath();
            graphReset++;
            drawYAxis();
        }
        if (!paused) {
            context.lineTo(
                600 + (time % resetNumber) * (450 / timeRange),
                250 - (yValue * 200) / Math.abs(max) // graph
            );
            context.stroke();
        }
    }

    function drawXAxis() {
        const ctx = document.getElementById("bottom-layer").getContext("2d");
        for (let i = 1; i <= 4; i++) {
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.font = "20px serif";
            ctx.textAlign = "end";
            ctx.fillText(Math.abs((i / 4) * max).toFixed(6), 590, 250 - i * 50);
        }
        for (let i = 1; i <= 4; i++) {
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.font = "20px serif";
            ctx.textAlign = "end";
            ctx.fillText(
                (-1 * Math.abs((i / 4) * max)).toFixed(6),
                590,
                250 + i * 50
            );
        }
    }

    function clearXAxis() {
        const ctx = document.getElementById("bottom-layer").getContext("2d");
        for (let i = 1; i <= 4; i++) {
            ctx.beginPath();
            ctx.fillStyle = "rgb(255, 255, 237)";
            ctx.fillRect(
                595,
                250 - i * 50,
                -1 * ctx.measureText(((i / 4) * max).toFixed(6)).width,
                10
            );
        }
        for (let i = 1; i <= 4; i++) {
            ctx.beginPath();
            ctx.fillStyle = "rgb(255, 255, 237)";
            ctx.fillRect(
                595,
                250 + i * 50,
                -1 * ctx.measureText(((i / 4) * max).toFixed(6)).width,
                10
            );
        }
    }

    function drawYAxis() {
        const ctx = document.getElementById("bottom-layer").getContext("2d");
        for (let i = 1; i <= 9; i++) {
            ctx.beginPath();
            ctx.fillStyle = "black";
            if (timeRange <= 100) ctx.font = "20px serif";
            else if (timeRange <= 5000) ctx.font = "15px serif";
            else ctx.font = "10px serif";
            ctx.textAlign = "center";
            ctx.fillText(
                (i * (timeRange / 9) + graphReset * timeRange).toFixed(1),
                600 + i * 50,
                270
            );
        }
    }

    function clearYAxis() {
        const ctx = document.getElementById("bottom-layer").getContext("2d");
        for (let i = 1; i <= 9; i++) {
            ctx.beginPath();
            if (timeRange <= 100) ctx.font = "20px serif";
            else if (timeRange <= 5000) ctx.font = "15px serif";
            else ctx.font = "10px serif";
            ctx.fillStyle = "rgb(224, 248, 248)";
            ctx.fillRect(
                600 + i * 50,
                255,
                ctx.measureText(
                    (i * (timeRange / 9) + graphReset * timeRange).toFixed(1)
                ).width / 2,
                20
            );
            ctx.fillRect(
                600 + i * 50,
                255,
                (-1 *
                    ctx.measureText(
                        (i * (timeRange / 9) + graphReset * timeRange).toFixed(
                            1
                        )
                    ).width) /
                    2,
                20
            );
        }
    }

    function clearGraph() {
        const canvas = document.getElementById("graph-layer");
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        clearYAxis();
    }

    function calculateAngularFrequency() {
        return 1 / Math.sqrt(inductance * capacitance);
    }

    function calculateCurrent() {
        return (
            -calculateAngularFrequency() *
            maxCapacitorCharge *
            Math.sin(calculateAngularFrequency() * time)
        );
    }

    function calculateCharge() {
        return (
            maxCapacitorCharge * Math.cos(calculateAngularFrequency() * time)
        );
    }

    function calculateElectricFieldEnergy() {
        return (
            (Math.pow(maxCapacitorCharge, 2) / (2 * capacitance)) *
            Math.pow(Math.cos(calculateAngularFrequency() * time), 2)
        );
    }

    function calculateMagneticFieldEnergy() {
        return (
            0.5 *
            inductance *
            Math.pow(maxCurrent, 2) *
            Math.pow(Math.sin(calculateAngularFrequency() * time), 2)
        );
    }

    return (
        <div>
            <TopMenu />
            <h1 style={{ textAlign: "center" }}>LC Circuit</h1>
            <canvas
                className="canvasStyle"
                id="bottom-layer"
                width="1100"
                height="600"
                style={{ border: "1px solid black" }}
            ></canvas>
            <canvas
                className="canvasStyle"
                id="top-layer"
                width="1100"
                height="600"
            ></canvas>
            <canvas
                className="canvasStyle"
                id="graph-layer"
                width="1100"
                height="600"
            ></canvas>
            <div className="controlMenu">
                <Button
                    variant="secondary"
                    onClick={() => {
                        if (paused === true) {
                            paused = false;
                        } else {
                            paused = true;
                        }
                    }}
                >
                    Play/Pause
                </Button>{" "}
                <Button
                    variant="secondary"
                    onClick={() => {
                        paused = true;
                        document
                            .getElementById("top-layer")
                            .getContext("2d").lineDashOffset = 0;
                        clearGraph();
                        initGraph();
                    }}
                >
                    Reset
                </Button>{" "}
                <br />
                <br />
                Measuring: {graphType}
                <br />
                <label>
                    <input
                        type="radio"
                        name="graphType"
                        value="current"
                        checked={graphType === "current"}
                        onChange={handleChange}
                    />
                    Current over time
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="graphType"
                        value="charge"
                        checked={graphType === "charge"}
                        onChange={handleChange}
                    />
                    Capacitor charge over time
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="graphType"
                        value="electricFieldEnergy"
                        checked={graphType === "electricFieldEnergy"}
                        onChange={handleChange}
                    />
                    Electric field energy over time
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="graphType"
                        value="magneticFieldEnergy"
                        checked={graphType === "magneticFieldEnergy"}
                        onChange={handleChange}
                    />
                    Magnetic field energy over time
                </label>
                <br />
                <br />
                Time Increase Per Frame: {timeChange}
                <br />
                <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    defaultValue={timeChange}
                    className="slider"
                    name="timeChange"
                    onChange={handleChange}
                />
                <br />
                <br />
                Max Charge {" (" + maxCapacitorCharge + " coulombs): "}
                <input
                    type="text"
                    placeholder="Charge (coulombs)"
                    name="charge"
                    onChange={handleChange}
                />
                <br />
                Capacitance {" (" + capacitance + " farads): "}
                <input
                    type="text"
                    placeholder="Capacitance (Farads)"
                    name="capacitance"
                    onChange={handleChange}
                />
                <br />
                Inductance {" (" + inductance + " henries): "}
                <input
                    type="text"
                    placeholder="Inductance (Henries)"
                    name="inductance"
                    onChange={handleChange}
                />
                <br />
                X-Axis Range (Seconds):{" "}
                <select
                    name="timeRange"
                    onChange={handleChange}
                    value={timeRange}
                >
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={450}>450</option>
                    <option value={1000}>1000</option>
                    <option value={5000}>5000</option>
                    <option value={10000}>10000</option>
                </select>
            </div>
        </div>
    );
}

export default LCpage;
