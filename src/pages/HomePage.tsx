import { useEffect, useState } from "react";
import type { Intervention } from "../types/Intervention";
import axios from "axios";
import InterventionCard from "../components/InterventionCard";

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
            <header className="h-[25%] p-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg mb-6 flex items-center">
                <h1 className="w-[50%] text-left text-3xl md:text-5xl font-extrabold font-montserrat text-white drop-shadow-lg tracking-tight">
                    Sigue a los verdaderos influencers de Colombia.
                </h1>
            </header>
            <div>
                <div className="interventions border-slate-500 my-2 rounded-2xl shadow-xl gap-3 p-3 w-[95%] md:max-w-[40%] md:m-auto flex flex-col md:min-h-[200px] items-center">
                    <p className=" font-medium text-xl text-gray-500">Intervenciones recientes</p>
                    {isFetching && <p className="text-sm text-gray-400">Cargando…</p>}
                    {interventions.map((eachIntervention) => (
                        <InterventionCard key={eachIntervention.id} intervention={eachIntervention} cardType={"feed"} />
                    ))
                    }
                </div>
            </div>
        </>
    )
}
export default HomePage