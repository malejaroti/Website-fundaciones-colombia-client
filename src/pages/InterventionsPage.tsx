import type { Intervention } from "../types/Intervention";
import InterventionCard from "../components/InterventionCard";
import { useEffect, useState } from 'react';
import axios from 'axios';

function InterventionsPage() {
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
    }

return (
    <main className="font-montserrat">
      {/* Page header, aligned with Home's gradient vibe */}
      <header className="p-6 md:p-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg mb-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold drop-shadow">Explora intervenciones</h1>
          <p className="text-sm md:text-base opacity-90">Descubre a quiénes están ayudando y dónde.</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4">
        <section>
          {isFetching ? (
            <p className="text-center text-gray-500">Cargando intervenciones</p>
          ) : interventions.map((eachIntervention) => ( <InterventionCard key={eachIntervention.id} intervention={eachIntervention} cardType={"feed"} /> ))
          }
        </section>
      </div>
    </main>
  );
}
export default InterventionsPage