import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Foundation } from "./Fundaciones.tsx";
import type { Intervention } from "../types/Intervention";
import { causas_arr } from "../data/causes_arr";
import Chip from "../components/Chip.tsx";
import Button from 'react-bootstrap/Button';


function FoundationDetails() {
    const [foundation, setFoundation] = useState<Foundation>({
        name: "",
        description: "",
        logo: "",
        department: "",
        city: "",
        website: "",
        linkedIn: "",
        instagram: "",
        causes: [],
        beneficiaries: [],
    });
    const [interventions, setInterventions] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const params = useParams();
    console.log(`params: ${params.id}`);

    useEffect(() => {
        getData();
        getInterventionsData();
    }, []);

    const getData = async () => {
        try {
            setIsFetching(true);
            const { data } = await axios.get<Intervention[]>(`${import.meta.env.VITE_SERVER_URL}/foundations/${params.id}`);
            console.log(`Response API:`, data);
            setFoundation(data);
            setIsFetching(false);
        } catch (error) {
            console.log(error);
        }
    };

    const getInterventionsData = async () => {
        try {
            setIsFetching(true);
            const responseApi = await axios.get(`${import.meta.env.VITE_SERVER_URL}/interventions/?foundationId=${params.id}`);
            console.log(`Response API:`, responseApi.data);
            setInterventions(responseApi.data);
            setIsFetching(false);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(`Foundation name:  ${foundation.name}`);
    return (
        <>
            {isFetching ? (
                <h1 className="text-center">Loading foundation data ...</h1>
            ) : foundation !== null ? (
                <>
                    <Link to={`/fundaciones/`} >
                    <p className="btn-back underline ml-3 mb-0 "  >Todas las fundaciones</p>
                    </Link>

                    <div className="page border-1 border-slate-500 my-2 rounded-2xl shadow-xl py-3 items-center flex flex-col">
                        <img className="foundation-logo mt-2 min-w-20 h-20 shadow-2xl rounded-sm text-xs" src={foundation.logo === "" ? undefined : foundation.logo} alt={`Logo ${foundation.name}`} />
                        <div className="foundation-card relative  gap-2 p-3 w-[95%] md:max-w-[40%] md:m-auto flex flex-col md:min-h-[200px] items-center">
                            <h1 className=" mb-1 text-base font-bold text-amber-950">
                                {foundation.name}
                            </h1>
                            <p className="mb-1 ">
                                📍<span>Sede principal: </span>{foundation.city}, {foundation.department}
                            </p>
                            <p className="description p-1 mb-1 text-xs text-justify">{foundation.description}</p>
                            <div className="chips-container flex flex-wrap gap-1">
                                {foundation.causes.map((eachCause) => {
                                    const foundCause = causas_arr.find((cause) => cause.name === eachCause);
                                    if (!foundCause) return null;
                                    return <Chip key={foundCause.name} label={foundCause.name} color={foundCause.color} />;
                                })}
                            </div>
                            <div className="socials left-[20px] bottom-[10px] w-full flex justify-center gap-3 md:gap-3">
                                <a href={foundation.linkedIn} target="_blank" rel="noopener noreferrer">
                                    <img src="/LinkedIn-logo.png" alt="LinkedIn logo" className="w-6 h-6" />
                                </a>
                                <a href={foundation.instagram} target="_blank" rel="noopener noreferrer">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" alt="Instagram logo" className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                        <Button as={Link} to={`/fundaciones/editar-fundacion/${foundation.id}`}className="edit-foundation absolute right-3" variant="secondary" size="sm" >Editar</Button>

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
            ) : (
                <h1>Foundation is null </h1>
            )
            }
        </>
    );
};
export default FoundationDetails;
