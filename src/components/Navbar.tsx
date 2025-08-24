import { useState } from "react";
import { Link } from "react-router-dom"

function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <nav className="fixed top-0 left-0 w-full shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-8 border-1 bg-amber-400">
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
                        <Link to="/fundaciones" className="text-gray-600 hover:text-gray-900">Fundaciones</Link>
                        <Link to="/fundaciones" className="text-gray-600 hover:text-gray-900">Voluntariados</Link>
                        <Link to="/fundaciones" className="text-gray-600 hover:text-gray-900">Nosotros</Link>
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
                <div id="mobile-menu" className={`${mobileOpen ? "block" : "hidden"} md:hidden border-t   `}>
                    <div className="px-4 py-3 space-y-2">
                        <Link to="/fundaciones" onClick={() => setMobileOpen(false)} className="block text-gray-800 hover:text-gray-900">Fundaciones</Link>
                        <Link to="/fundaciones" onClick={() => setMobileOpen(false)} className="block text-gray-800 hover:text-gray-900">Voluntariados</Link>
                        <Link to="/fundaciones" onClick={() => setMobileOpen(false)} className="block text-gray-800 hover:text-gray-900">Nosotros</Link>
                    </div>

                </div>
            </div>
        </nav>
    )
}
export default Navbar