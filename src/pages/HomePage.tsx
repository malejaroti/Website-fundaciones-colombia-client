import heroImage from "../assets/hero-image.png"
import { Link } from "react-router-dom";
import CausesSection from "../components/CausesSectionHome";
import Button from "react-bootstrap/esm/Button";
import InterventionsCarousel from "../components/InterventionsCarousel";

function HomePage() {
    return (
        <>
            <header className="p-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg mb-6 flex items-center md:max-h-[60%] md:justify-center">
                <div className="w-[60%] flex flex-col gap-2 p-1 lg:h-full lg:ml-50">
                    <p className="font-montserrat w-full text-left text-lg text-white drop-shadow-lg
                                lg:text-5xl font-medium">
                        Descubre, conecta y apoya a las fundaciones que transforman nuestro país...
                    </p>
                    <Link to={"/fundaciones"}> 
                        <button className=" px-3 py-2 border rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold shadow-md hover:from-blue-500 hover:to-purple-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Explora las fundaciones
                        </button>
                    </Link>
                </div>
                <img src={heroImage} alt="" className="lg:max-h-[300px]" />
            </header>

            <div className="py-3 lg:flex lg:justify-center lg:gap-10 border">
                <section>

                    <div className="interventions border-slate-500 my-2  shadow-xl gap-3 py-3 px-10 w-[95%]  lg:m-auto flex flex-col lg:min-h-[200px] lg:max-w-[800px] items-center">
                        <h2 className="text-2xl font-bold text-gray-800 text-center font-montserrat my-0">
                            Últimas Intervenciones
                        </h2>
                        <p className="mt-0 text-sm text-center font-montserrat">Descubre las acciones más recientes de las fundaciones en todo el país.</p>
                        <InterventionsCarousel />
                        <Link to={"/intervenciones"} className="mb-3">
                            <Button variant="primary" size="sm"> Ver todas la intervenciones</Button>
                        </Link>
                    </div>
                </section>
                <CausesSection />
            </div>

        </>
    )
}
export default HomePage