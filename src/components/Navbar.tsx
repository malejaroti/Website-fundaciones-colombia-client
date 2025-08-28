import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/fundaciones-colombia-logo2.png';
import { useState } from "react";

function MyNavbar() {

    const [expanded, setexpanded] = useState(false);
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary shadow-lg border-b-1 border-slate-500" fixed="top">
                <Container>
                    <Navbar.Brand to={"/"} as={Link} className="flex items-center gap-2"
                    >
                        <img
                            src={logo}
                            width="40"
                            height="40"
                            className="inline-block align-top"
                            alt="Logo fundaciones Colombia"
                        />{' '}
                        <span className="font-montserrat text-base w-[60%] flex items-center text-wrap break-words">
                            Fundaciones Colombia
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto lg:flex lg:w-[90%] lg:justify-between">
                            <NavDropdown title="Fundaciones" id="basic-nav-dropdown" className="" >
                                <NavDropdown.Item to={"/fundaciones"} as={Link} eventKey="1" >Ver fundaciones</NavDropdown.Item>
                                <NavDropdown.Item to={"/fundaciones/nueva-fundacion"} as={Link} eventKey="2">Anadir fundacion</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link to={"/intervenciones"} as={Link} eventKey="3" className="">Intervenciones</Nav.Link>
                            <Nav.Link to={"/about"} as={Link} eventKey="4" className="">Nosotros</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>
        </>
    )
}
export default MyNavbar