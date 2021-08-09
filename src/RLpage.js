import React, { useState, useEffect } from "react";
import TopMenu from "./TopMenu";
import Button from "react-bootstrap/Button";

function RLpage() {
    let time = 0,
        paused = true,
        graphReset = 0,
        requestID;
    const [timeChange, setTimeChange] = useState(1);
    const [batteryVoltage, setBatteryVoltage] = useState(10);
    const [inductance, setInductance] = useState(10);
    const [resistance, setResistance] = useState(1);
    const [graphType, setGraphType] = useState("current");
    const [maxCurrent, setMaxCurrent] = useState(batteryVoltage / resistance);
    const [maxInductorVoltage, setMaxInductorVoltage] =
        useState(batteryVoltage);
    const [maxMagneticFieldEnergy, setMaxMagneticFieldEnergy] = useState(
        0.5 * inductance * Math.pow(batteryVoltage / resistance, 2)
    );
    const [maxCurrentDerivative, setMaxCurrentDerivative] = useState(
        batteryVoltage / inductance
    );
    const [max, setMax] = useState(maxCurrent);
    const [timeRange, setTimeRange] = useState(450);
    const [isDischarging, setIsDischarging] = useState(false);

    useEffect(() => {
        draw();
        animate();
        initGraph();
    }, [
        graphType,
        timeChange,
        batteryVoltage,
        inductance,
        resistance,
        timeRange,
        isDischarging
    ]);

    function handleChange(event) {
        const { name, value, type } = event.target;
        if (type === "radio") {
            setGraphType(value);
            switch (value) {
                case "current":
                    setMax(maxCurrent);
                    break;
                case "energy":
                    setMax(maxMagneticFieldEnergy);
                    break;
                case "ivoltage":
                    setMax(maxInductorVoltage);
                    break;
                case "di/dt":
                    setMax(maxCurrentDerivative);
                    break;
                default:
                    setMax(maxCurrent);
            }
        } else if (name === "timeChange") {
            setTimeChange(parseInt(value));
        } else if (name === "batteryVoltage") {
            if (Number.isFinite(parseInt(value))) setBatteryVoltage(value);
            if (!isDischarging) {
                setMaxCurrent(value / resistance);
                setMaxInductorVoltage(value);
                setMaxMagneticFieldEnergy(
                    0.5 * inductance * Math.pow(value / resistance, 2)
                );
                setMaxCurrentDerivative(value / inductance);
                switch (graphType) {
                    case "current":
                        setMax(value / resistance);
                        break;
                    case "energy":
                        setMax(
                            0.5 * inductance * Math.pow(value / resistance, 2)
                        );
                        break;
                    case "ivoltage":
                        setMax(value);
                        break;
                    case "di/dt":
                        setMax(value / inductance);
                        break;
                    default:
                        setMax(value / resistance);
                }
            } else {
                setMaxCurrent(value / resistance);
                setMaxInductorVoltage(value);
                setMaxMagneticFieldEnergy(
                    0.5 * inductance * Math.pow(value / resistance, 2)
                );
                setMaxCurrentDerivative(value / inductance);
                switch (graphType) {
                    case "current":
                        setMax(value / resistance);
                        break;
                    case "energy":
                        setMax(
                            0.5 * inductance * Math.pow(value / resistance, 2)
                        );
                        break;
                    case "ivoltage":
                        setMax(value);
                        break;
                    case "di/dt":
                        setMax(value / inductance);
                        break;
                    default:
                        setMax(value / resistance);
                }
            }
        } else if (name === "inductance") {
            if (Number.isFinite(parseInt(value))) setInductance(value);
            if (!isDischarging) {
                setMaxCurrent(batteryVoltage / resistance);
                setMaxInductorVoltage(batteryVoltage);
                setMaxMagneticFieldEnergy(
                    0.5 * value * Math.pow(batteryVoltage / resistance, 2)
                );
                setMaxCurrentDerivative(batteryVoltage / value);
                switch (graphType) {
                    case "current":
                        setMax(batteryVoltage / resistance);
                        break;
                    case "energy":
                        setMax(
                            0.5 *
                                value *
                                Math.pow(batteryVoltage / resistance, 2)
                        );
                        break;
                    case "ivoltage":
                        setMax(batteryVoltage);
                        break;
                    case "di/dt":
                        setMax(batteryVoltage / value);
                        break;
                    default:
                        setMax(batteryVoltage / resistance);
                }
            } else {
                setMaxCurrent(batteryVoltage / resistance);
                setMaxInductorVoltage(batteryVoltage);
                setMaxMagneticFieldEnergy(
                    0.5 * value * Math.pow(batteryVoltage / resistance, 2)
                );
                setMaxCurrentDerivative(batteryVoltage / value);
                switch (graphType) {
                    case "current":
                        setMax(batteryVoltage / resistance);
                        break;
                    case "energy":
                        setMax(
                            0.5 *
                                value *
                                Math.pow(batteryVoltage / resistance, 2)
                        );
                        break;
                    case "ivoltage":
                        setMax(batteryVoltage);
                        break;
                    case "di/dt":
                        setMax(batteryVoltage / value);
                        break;
                    default:
                        setMax(batteryVoltage / resistance);
                }
            }
        } else if (name === "resistance") {
            if (Number.isFinite(parseInt(value))) setResistance(value);
            if (!isDischarging) {
                setMaxCurrent(batteryVoltage / value);
                setMaxInductorVoltage(batteryVoltage);
                setMaxMagneticFieldEnergy(
                    0.5 * inductance * Math.pow(batteryVoltage / value, 2)
                );
                setMaxCurrentDerivative(batteryVoltage / inductance);
                switch (graphType) {
                    case "current":
                        setMax(batteryVoltage / value);
                        break;
                    case "energy":
                        setMax(
                            0.5 *
                                inductance *
                                Math.pow(batteryVoltage / value, 2)
                        );
                        break;
                    case "ivoltage":
                        setMax(batteryVoltage);
                        break;
                    case "di/dt":
                        setMax(batteryVoltage / inductance);
                        break;
                    default:
                        setMax(batteryVoltage / value);
                }
            } else {
                setMaxCurrent(batteryVoltage / value);
                setMaxInductorVoltage(batteryVoltage);
                setMaxMagneticFieldEnergy(
                    0.5 * inductance * Math.pow(batteryVoltage / value, 2)
                );
                setMaxCurrentDerivative(batteryVoltage / inductance);
                switch (graphType) {
                    case "current":
                        setMax(batteryVoltage / value);
                        break;
                    case "energy":
                        setMax(
                            0.5 *
                                inductance *
                                Math.pow(batteryVoltage / value, 2)
                        );
                        break;
                    case "ivoltage":
                        setMax(batteryVoltage);
                        break;
                    case "di/dt":
                        setMax(batteryVoltage / inductance);
                        break;
                    default:
                        setMax(batteryVoltage / value);
                }
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

        // clear gaps for resistor, battery, then capacitor
        context.fillStyle = "rgb(255, 255, 237)";
        context.fillRect(143, 45, 214, 10);
        context.fillRect(40, 225, 20, 50);
        context.fillRect(440, 150, 20, 200);

        // draw inductor
        context.beginPath();
        context.lineJoin = "round";
        context.moveTo(170, 50);
        for (let i = 0; i < 5; i++) {
            context.beginPath();
            context.arc(170 + 40 * i, 50, 30, 0, Math.PI, 1);
            context.stroke();
        }
        for (let i = 0; i < 4; i++) {
            context.beginPath();
            context.ellipse(190 + i * 40, 50, 10, 30, 0, 0, Math.PI, false);
            context.stroke();
        }

        // draw resistor
        context.beginPath();
        context.lineJoin = "miter";
        context.moveTo(450, 150);
        for (let i = 0; i < 5; i++) {
            context.lineTo(475, 150 + i * 40 + 10);
            context.lineTo(425, 150 + i * 40 + 30);
            context.lineTo(450, 150 + i * 40 + 40);
        }

        // draw lines for switch
        context.lineWidth = 5;
        context.moveTo(130, 50);
        context.lineTo(130, 400);
        context.stroke();
        context.beginPath();
        context.arc(130, 400, 5, 0, 2 * Math.PI);
        context.fillStyle = "rgb(211, 211, 211)";
        context.fill();
        if (isDischarging) {
            context.fillStyle = "rgb(255, 255, 237)";
            context.fillRect(135, 445, 30, 10);
            context.beginPath();
            context.moveTo(170, 450);
            context.lineTo(130, 400);
            context.strokeStyle = "rgb(211, 211, 211)";
            context.stroke();
        }
        context.beginPath();
        context.fillStyle = "rgb(211, 211, 211)";
        context.arc(130, 450, 5, 0, Math.PI * 2);
        context.fill();
        context.beginPath();
        context.arc(170, 450, 5, 0, Math.PI * 2);
        context.fill();

        // draw battery
        context.beginPath();
        context.fillStyle = "rgb(211, 211, 211)";
        context.fillRect(20, 225, 60, 10);
        context.fillRect(30, 265, 40, 10);

        // draw plus and minus sign next to battery
        context.beginPath();
        context.lineWidth = 3;
        context.moveTo(75, 195);
        context.lineTo(75, 215);
        context.stroke();
        context.moveTo(65, 205);
        context.lineTo(85, 205);
        context.stroke();
        context.moveTo(65, 295);
        context.lineTo(85, 295);
        context.stroke();

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
            if (isDischarging) {
                if (calculateCurrentDischarge() <= 35)
                    context.lineDashOffset += calculateCurrentDischarge();
                else context.lineDashOffset += 35;
            } else {
                if (calculateCurrent() <= 35)
                    context.lineDashOffset += calculateCurrent();
                else context.lineDashOffset += 35;
            }
            time += timeChange;
        }
        context.strokeStyle = "rgb(135, 206, 235)";
        if (isDischarging) context.strokeRect(130, 50, 320, 400);
        else context.strokeRect(50, 50, 400, 400);
        context.setLineDash([]);
        context.lineCap = "butt";

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
        if (isDischarging) {
            switch (graphType) {
                case "current":
                    yValue = calculateCurrentDischarge();
                    break;
                case "energy":
                    yValue = calculateMagneticFieldEnergyDischarge();
                    break;
                case "ivoltage":
                    yValue = calculateInductorVoltageDischarge();
                    break;
                case "di/dt":
                    yValue = calculateCurrentDischargeDerivative();
                    break;
                default:
                    yValue = calculateCurrentDischarge();
            }
        } else {
            switch (graphType) {
                case "current":
                    yValue = calculateCurrent();
                    break;
                case "energy":
                    yValue = calculateMagneticFieldEnergy();
                    break;
                case "ivoltage":
                    yValue = calculateInductorVoltage();
                    break;
                case "di/dt":
                    yValue = calculateCurrentDerivative();
                    break;
                default:
                    yValue = calculateCurrent();
            }
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
        if (isDischarging) {
            switch (graphType) {
                case "current":
                    yValue = calculateCurrentDischarge();
                    break;
                case "energy":
                    yValue = calculateMagneticFieldEnergyDischarge();
                    break;
                case "ivoltage":
                    yValue = calculateInductorVoltageDischarge();
                    break;
                case "di/dt":
                    yValue = calculateCurrentDischargeDerivative();
                    break;
                default:
                    yValue = calculateCurrentDischarge();
            }
        } else {
            switch (graphType) {
                case "current":
                    yValue = calculateCurrent();
                    break;
                case "energy":
                    yValue = calculateMagneticFieldEnergy();
                    break;
                case "ivoltage":
                    yValue = calculateInductorVoltage();
                    break;
                case "di/dt":
                    yValue = calculateCurrentDerivative();
                    break;
                default:
                    yValue = calculateCurrent();
            }
        }
        context.fillStyle = "rgb(255, 255, 237)";
        context.fillRect(0, 480, 1100, 100);
        context.fillStyle = "rgb(0, 0, 139)";
        context.font = "20px serif";
        context.fillText(
            "Battery Voltage: " + batteryVoltage + " volts",
            50,
            500
        );
        context.fillText("Inductance: " + inductance + " henries", 50, 525);
        context.fillText("Resistance: " + resistance + " ohms", 50, 550);
        context.fillText(
            "Time Constant: " + inductance / resistance + " seconds",
            50,
            575
        );
        context.fillStyle = "rgb(0, 100, 0)";
        context.font = "40px serif";
        context.fillText(inductance + " H", 160, 120);
        context.fillText(resistance + " Ω", 350, 270);
        context.fillStyle = "rgb(255, 0, 255)";
        context.font = "20px serif";
        if (isDischarging) {
            context.fillText(
                "Current: " + calculateCurrentDischarge().toFixed(2) + " amps",
                400,
                500
            );
            context.fillText(
                "Energy in Magnetic Field: " +
                    calculateMagneticFieldEnergyDischarge().toFixed(2) +
                    " joules",
                400,
                525
            );
            context.fillText(
                "Inductor Voltage: " +
                    calculateInductorVoltageDischarge().toFixed(2) +
                    " volts",
                400,
                550
            );
            context.fillText(
                "dI/dt: " +
                    calculateCurrentDischargeDerivative().toFixed(2) +
                    " amps per second",
                400,
                575
            );
        } else {
            context.fillText(
                "Current: " + calculateCurrent().toFixed(2) + " amps",
                400,
                500
            );
            context.fillText(
                "Energy in Magnetic Field: " +
                    calculateMagneticFieldEnergy().toFixed(2) +
                    " joules",
                400,
                525
            );
            context.fillText(
                "Inductor Voltage: " +
                    calculateInductorVoltage().toFixed(2) +
                    " volts",
                400,
                550
            );
            context.fillText(
                "dI/dt : " +
                    calculateCurrentDerivative().toFixed(2) +
                    " amps per second",
                400,
                575
            );
        }
        context.fillStyle = "rgb(148, 0, 211)";
        context.fillText("X-axis: " + time + " seconds", 800, 500);
        context.fillText("Y-axis: " + graphType, 800, 525);
        context.fillText(
            "Max Current: " + maxCurrent.toFixed(2) + " amps",
            800,
            550
        );
        context.fillText(
            "Max Magnetic Field Energy: " +
                parseFloat(maxMagneticFieldEnergy).toFixed(2) +
                " J",
            750,
            575
        );
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
            ctx.fillText(Math.abs((i / 4) * max), 590, 250 - i * 50);
        }
        for (let i = 1; i <= 4; i++) {
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.font = "20px serif";
            ctx.textAlign = "end";
            ctx.fillText(-1 * Math.abs((i / 4) * max), 590, 250 + i * 50);
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
                -1 * ctx.measureText((i / 4) * max).width,
                10
            );
        }
        for (let i = 1; i <= 4; i++) {
            ctx.beginPath();
            ctx.fillStyle = "rgb(255, 255, 237)";
            ctx.fillRect(
                595,
                250 + i * 50,
                -1 * ctx.measureText((i / 4) * max).width,
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

    function calculateCurrent() {
        return (
            (batteryVoltage / resistance) *
            (1 - Math.pow(Math.E, -(resistance * time) / inductance))
        );
    }

    function calculateMagneticFieldEnergy() {
        return 0.5 * inductance * Math.pow(calculateCurrent(), 2);
    }

    function calculateInductorVoltage() {
        return (
            -batteryVoltage *
            Math.pow(Math.E, -(time * resistance) / inductance)
        );
    }

    function calculateCurrentDerivative() {
        return (
            (batteryVoltage / inductance) *
            Math.pow(Math.E, -(time * resistance) / inductance)
        );
    }

    function calculateCurrentDischarge() {
        return (
            (batteryVoltage / resistance) *
            Math.pow(Math.E, -(time * resistance) / inductance)
        );
    }

    function calculateMagneticFieldEnergyDischarge() {
        return 0.5 * inductance * Math.pow(calculateCurrentDischarge(), 2);
    }

    function calculateInductorVoltageDischarge() {
        return (
            batteryVoltage * Math.pow(Math.E, -(time * resistance) / inductance)
        );
    }

    function calculateCurrentDischargeDerivative() {
        return (
            -1 *
            (batteryVoltage / inductance) *
            Math.pow(Math.E, -(time * resistance) / inductance)
        );
    }

    return (
        <div>
            <TopMenu />
            <h1 style={{ textAlign: "center" }}>RL Circuit</h1>
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
                <Button
                    variant="secondary"
                    onClick={() => {
                        window.cancelAnimationFrame(requestID);
                        paused = true;
                        document
                            .getElementById("top-layer")
                            .getContext("2d").lineDashOffset = 0;
                        clearGraph();
                        if (isDischarging) {
                            setIsDischarging(false);

                            setMaxCurrent(batteryVoltage / resistance);
                            setMaxInductorVoltage(batteryVoltage);
                            setMaxMagneticFieldEnergy(
                                0.5 *
                                    inductance *
                                    Math.pow(batteryVoltage / resistance, 2)
                            );
                            setMaxCurrentDerivative(
                                batteryVoltage / inductance
                            );

                            switch (graphType) {
                                case "current":
                                    setMax(batteryVoltage / resistance);
                                    break;
                                case "energy":
                                    setMax(
                                        0.5 *
                                            inductance *
                                            Math.pow(
                                                batteryVoltage / resistance,
                                                2
                                            )
                                    );
                                    break;
                                case "ivoltage":
                                    setMax(batteryVoltage);
                                    break;
                                case "di/dt":
                                    setMax(batteryVoltage / inductance);
                                    break;
                                default:
                                    setMax(batteryVoltage / resistance);
                            }
                        } else {
                            setIsDischarging(true);
                            setMaxCurrent(batteryVoltage / resistance);
                            setMaxInductorVoltage(batteryVoltage);
                            setMaxMagneticFieldEnergy(
                                0.5 *
                                    inductance *
                                    Math.pow(batteryVoltage / resistance, 2)
                            );
                            setMaxCurrentDerivative(
                                batteryVoltage / inductance
                            );
                            switch (graphType) {
                                case "current":
                                    setMax(batteryVoltage / resistance);
                                    break;
                                case "energy":
                                    setMax(
                                        0.5 *
                                            inductance *
                                            Math.pow(
                                                batteryVoltage / resistance,
                                                2
                                            )
                                    );
                                    break;
                                case "ivoltage":
                                    setMax(batteryVoltage);
                                    break;
                                case "di/dt":
                                    setMax(batteryVoltage / inductance);
                                    break;
                                default:
                                    setMax(batteryVoltage / resistance);
                            }
                        }
                    }}
                >
                    Move Switch
                </Button>
                <br />
                <br />
                <h6>
                    Current State: {isDischarging ? "Discharging" : "Charging"}
                </h6>
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
                        value="energy"
                        checked={graphType === "energy"}
                        onChange={handleChange}
                    />
                    Potential energy in magnetic field over time
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="graphType"
                        value="ivoltage"
                        checked={graphType === "ivoltage"}
                        onChange={handleChange}
                    />
                    Inductor voltage over time
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="graphType"
                        value="di/dt"
                        checked={graphType === "di/dt"}
                        onChange={handleChange}
                    />
                    Rate of change of current over time
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
                Battery voltage {" (" + batteryVoltage + " volts): "}
                <input
                    type="text"
                    placeholder="Battery Voltage (Volts)"
                    name="batteryVoltage"
                    onChange={handleChange}
                />
                <br />
                Inductance {" (" + inductance + "  henries): "}
                <input
                    type="text"
                    placeholder="Inductance (Henries)"
                    name="inductance"
                    onChange={handleChange}
                />
                <br />
                Resistance {" (" + resistance + " ohms): "}
                <input
                    type="text"
                    placeholder="Resistance (Ohms)"
                    name="resistance"
                    onChange={handleChange}
                />
                <br />
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

export default RLpage;
