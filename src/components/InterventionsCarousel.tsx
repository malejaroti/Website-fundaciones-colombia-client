import Carousel from 'react-bootstrap/Carousel';
import type { Intervention } from "../types/Intervention";
import InterventionCard from "../components/InterventionCard";
import { useEffect, useState } from 'react';
import axios from 'axios';

function InterventionsCarousel() {
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
            setInterventions(responseApi.data);
            setIsFetching(false);
        } catch (error) {
            console.log(error);
        }
};
return (
    <Carousel className='lg:max-w-[800px]'>
    {isFetching && <p className="text-sm text-gray-400">Cargando…</p>}
    {interventions.map((eachIntervention) => (
        <Carousel.Item key={eachIntervention.id}>
            <InterventionCard intervention={eachIntervention} cardType={"feed"} />
        </Carousel.Item>
    ))
    }

      {/* <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
}
export default InterventionsCarousel