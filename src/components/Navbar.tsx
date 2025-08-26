import { useState } from "react";
import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [foundationsMenuOpen, setFoundationsMenuOpen] = useState(false);
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
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
                            <Nav.Link to={"/"} as={Link}></Nav.Link>
                            <NavDropdown title="Fundaciones" id="basic-nav-dropdown">
                                <NavDropdown.Item to={"/fundaciones"} as={Link}>Ver fundaciones</NavDropdown.Item>
                                <NavDropdown.Item to={"/fundaciones/nueva-fundacion"} as={Link}>Anadir fundacion</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link to={"/about"} as={Link}>Nosotros</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>
            <nav className="fixed left-0 w-full shadow-md z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-8 border-1 bg-cyan-700 text-white">
                    <div className="flex justify-between items-center h-16 border-1">

                        {/* logo */}
                        <Link to="/" className="h-full">
                            <div className="flex items-center h-full gap-2 ">
                                <img src="fundaciones-colombia-logo2.png" className="logo h-full" alt="" />
                                <p className="w-1/10">Fundaciones Colombia</p>
                                {/* <a href="#" className="text-xl font-bold text-gray-800">Fundaciones Colombia</a> */}
                            </div>
                        </Link>

                        {/* <!-- Nav Links --> */}
                        <div className="hidden md:flex space-x-6">  {/* md: screen width > 768px*/}
                            <button
                                onClick={() => setFoundationsMenuOpen(o => !o)}
                                aria-controls="foundations-sub-menu"
                                aria-expanded={foundationsMenuOpen}
                                className="text-gray-600 hover:text-gray-900">Fundaciones</button>
                            <Link to="/fundaciones" className="text-gray-600 hover:text-gray-900">Voluntariados</Link>
                            <Link to="/about" className="text-gray-600 hover:text-gray-900">Nosotros</Link>
                        </div>
                        {/* <!-- Foundations sub Links --> */}
                        <div className="hidden md:flex space-x-6">  {/* md: screen width > 768px*/}
                            <Link to="/fundaciones" className="text-gray-600 hover:text-gray-900">Ver fundaciones</Link>
                            <Link to="/fundaciones/nueva-fundacion" className="text-gray-600 hover:text-gray-900">Anadir fundación</Link>
                        </div>

                        {/* <!-- Mobile Menu Button --> */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileOpen(o => !o)}
                                aria-controls="mobile-menu"
                                aria-expanded={mobileOpen}
                                className="text-gray-800 hover:text-gray-900 focus:outline-none">

                                <p className=" border-1 p-1">Menu</p>
                            </button>
                        </div>
                    </div>
                    {/* Mobile menu */}
                    <div id="mobile-menu" className={`${mobileOpen ? "block" : "hidden"}  text-white md:hidden border-t   `}>
                        <div className="px-4 py-3 space-y-2">
                            <button
                                onClick={() => setFoundationsMenuOpen(o => !o)}
                                aria-controls="foundations-sub-menu"
                                aria-expanded={foundationsMenuOpen}
                                className="text-gray-600 hover:text-gray-900">Fundaciones</button>
                            {/* Foundations sub menu */}
                            <div id="foundations-sub-menu" className={`${foundationsMenuOpen ? "block" : "hidden"} bg-amber-300  w-full flex flex-col`}>
                                <Link to="/fundaciones" className="text-gray-600 hover:text-gray-900 p-2 mb-0" onClick={() => setMobileOpen(o => !o)}>Ver fundaciones</Link>
                                <Link to="/fundaciones/nueva-fundacion"
                                    className="text-gray-600 hover:text-gray-900 p-2 mt-0"
                                    onClick={() => setMobileOpen(o => !o)}
                                >Anadir fundación</Link>
                            </div>
                            <Link to="/fundaciones" onClick={() => setMobileOpen(false)} className="block text-gray-800 hover:text-gray-900">Voluntariados</Link>
                            <Link to="/about" onClick={() => setMobileOpen(false)} className="block text-gray-800 hover:text-gray-900">Nosotros</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default MyNavbar