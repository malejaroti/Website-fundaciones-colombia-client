import { useEffect, useState } from "react";
import type { Intervention } from "../types/Intervention";
import axios from "axios";
function HomePage() {

    const [interventions, setInterventions] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        getInterventionsData();
    }, []);

    const getInterventionsData = async () => {
        try {
            setIsFetching(true);
            const responseApi = await axios.get(`${import.meta.env.VITE_SERVER_URL}/interventions/`);
            console.log(`Response API:`, responseApi.data);
            setInterventions(responseApi.data);
            setIsFetching(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <header>
                Header
            </header>
            <div>
                <h1>Intervenciones recientes</h1>
                <div className="interventions border-slate-500 my-2 rounded-2xl shadow-xl gap-3 p-3 w-[95%] md:max-w-[40%] md:m-auto flex flex-col md:min-h-[200px] items-center">
                    <p className=" font-medium text-xl text-gray-500">Intervenciones recientes</p>
                    {interventions.map((eachIntervention) => (
                        <div key={eachIntervention.id} className="intervention-card">
                            <p
                                className="intervention-text border border-slate-300 rounded-sm p-2 text-justify">
                                {eachIntervention.description}
                            </p>
                            <button>Edit</button>
                            <button>Delete</button>

                        </div>))
                    }
                </div>
            </div>
        </>
    )
}
export default HomePage