// import { findByLabelText } from "@testing-library/react";
import React from "react";
import logo from "./images/logo.png";
import github from "./images/github.png";
import {Navbar, Nav, NavDropdown, OverlayTrigger, Tooltip } from "react-bootstrap";

function TopMenu() {
    return (
        <div>
            <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        alt=""
                        className="rotate"
                        width="50"
                        height="50"
                    />{" "}
                    Home Page
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Circuits" id="nav-dropdown">
                            <NavDropdown.Item href="RC">RC</NavDropdown.Item>
                            <NavDropdown.Item href="RL">RL</NavDropdown.Item>
                            <NavDropdown.Item href="LC">LC</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Nav>
                    <OverlayTrigger
                        key="bottom"
                        placement="bottom"
                        overlay={<Tooltip>Github</Tooltip>}
                        delay = {{ show: 100, hide: 200}}
                    >
                        <Navbar.Brand href="https://github.com/nichoIasWang">
                            <img src={github} width="50" height="50" alt="" />
                        </Navbar.Brand>
                    </OverlayTrigger>
                </Nav>
            </Navbar>
        </div>
    );
}

export default TopMenu;
