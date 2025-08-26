import { useState } from "react";
import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNavbar() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand to={"/"} as={Link} className="flex items-center gap-2"
                    >
                        <img
                            src="fundaciones-colombia-logo2.png"
                            width="40"
                            height="40"
                            className="inline-block align-top"
                            alt="Logo fundaciones Colombia"
                        />{' '}
                        <span className="text-base w-[60%] flex items-center text-wrap break-words">
                            Fundaciones Colombia
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link to={"/"} as={Link}>Home</Nav.Link> */}
                            <NavDropdown title="Fundaciones" id="basic-nav-dropdown">
                                <NavDropdown.Item to={"/fundaciones"} as={Link} eventKey="1" >Ver fundaciones</NavDropdown.Item>
                                <NavDropdown.Item to={"/fundaciones/nueva-fundacion"} as={Link} eventKey="2">Anadir fundacion</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link to={"/about"} as={Link} eventKey="3">Nosotros</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>
        </>
    )
}
export default MyNavbar