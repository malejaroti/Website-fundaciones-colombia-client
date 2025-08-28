import { useEffect, useState } from "react";
import type { Intervention } from "../types/Intervention";
import axios from "axios";
import InterventionCard from "../components/InterventionCard";
import heroImage from "../assets/hero-image.png"
import { Link } from "react-router-dom";
import CausesSection from "../components/CausesSectionHome";


function HomePage() {

    const [interventions, setInterventions] = useState<Intervention[]>([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        getInterventionsData();
    }, []);

    const getInterventionsData = async () => {
        try {
            setIsFetching(true);
            // const responseApi = await axios.get(`${import.meta.env.VITE_SERVER_URL}/interventions/`);
            const responseApi = await axios.get(`${import.meta.env.VITE_SERVER_URL}/interventions/?_expand=foundation`);
            console.log(`Response API:`, responseApi.data);
            setInterventions(responseApi.data);
            setIsFetching(false);
        } catch (error) {
            console.log(error);
        }
    };

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

            <div className="lg:flex border-2">
                <section>
                    <div className="interventions border-slate-500 my-2 rounded-2xl shadow-xl gap-3 p-3 w-[95%] lg:max-w-[40%] lg:m-auto flex flex-col lg:min-h-[200px] items-center">
                        <p className=" font-medium text-xl text-gray-500">Intervenciones recientes</p>
                        {isFetching && <p className="text-sm text-gray-400">Cargando…</p>}
                        {interventions.map((eachIntervention) => (
                            <InterventionCard key={eachIntervention.id} intervention={eachIntervention} cardType={"feed"} />
                        ))
                        }
                    </div>
                </section>
                <CausesSection />
            </div>

        </>
    )
}
export default HomePage