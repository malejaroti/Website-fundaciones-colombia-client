import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Foundation } from "./Fundaciones.tsx";
import type { Intervention } from "../types/Intervention";
import { causas_arr } from "../data/causes_arr";
import Chip from "../components/Chip.tsx";
import Button from 'react-bootstrap/Button';
import InterventionCard from "../components/InterventionCard.tsx";
import iconGoToWebsite from "../assets/icon-go-to-website.png";



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

    const emptyIntervention: Intervention = {
        description: "",
        intervention_date_year: "",
        intervention_date_month: "",
        intervention_date_day: "",
        foundationId: ""
    }
    const [interventions, setInterventions] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [creatingNewIntervention, setCreatingNewIntervention] = useState(false);
    const [formDataNewIntervention, setFormDataNewIntervention] = useState<Intervention>(emptyIntervention);


    const params = useParams();
    // console.log(`params: ${params.id}`);

    useEffect(() => {
        getData();
        getInterventionsData();
    }, []);

    const getData = async () => {
        try {
            setIsFetching(true);
            const { data } = await axios.get<Foundation>(`${import.meta.env.VITE_SERVER_URL}/foundations/${params.id}`);
            // console.log(`Response API:`, data);
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

    const handleOnChange = (event:React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        console.log
        setFormDataNewIntervention((prev) => ({
        ...prev,
        [name]: value,
        }))
    }
    const handleSubmitNewIntervention = async (event:React.FormEvent) => {
        event.preventDefault();
        const newIntervention = {
            intervention_date_year : formDataNewIntervention.intervention_date_year?.toString(),
            intervention_date_month : formDataNewIntervention.intervention_date_month?.toString(),
            intervention_date_day : formDataNewIntervention.intervention_date_day?.toString(),
            description: formDataNewIntervention.description,
            foundationId : foundation.id
        }
        console.log("new intervention", newIntervention)
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/interventions/`, newIntervention)
        setFormDataNewIntervention(emptyIntervention)
        setCreatingNewIntervention(false)
        getInterventionsData()
    }

    return (
        <>
            {isFetching ? (
                <h1 className="text-center">Loading foundation data ...</h1>
            ) : foundation !== null ? (
                <main className="pt-10 lg:mx-80">
                    <Link to={`/fundaciones/`} >
                        <p className="btn-back underline ml-3 mb-0 "  >Todas las fundaciones</p>
                    </Link>

                    <div className="page relative border-slate-500 mx-3 rounded-2xl shadow-xl py-3 items-center flex flex-col">
                        <img className="foundation-logo mt-2 min-w-20 h-20 shadow-2xl rounded-sm text-xs" src={foundation.logo === "" ? undefined : foundation.logo} alt={`Logo ${foundation.name}`} />
                        <div className="foundation-card relative  gap-2 p-3 w-[95%] md:max-w-[40%] md:m-auto flex flex-col md:min-h-[200px] items-center">
                            <h1 className=" mb-1 text-base text-center font-bold text-amber-950">
                                {foundation.name}
                            </h1>
                            <p className="mb-1 lg:text-lg">
                                📍<span>Sede principal: </span>{foundation.city}, {foundation.department}
                            </p>
                            <div className="socials left-[20px] bottom-[10px] w-full flex justify-center gap-3 lg:mb-5 lg:gap-3">
                                {foundation.website ? (
                                    <a href={foundation.website} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100">
                                    <img src={iconGoToWebsite} alt="Ir al sitio web" className="w-6 h-6" />
                                    </a>
                                ) : null}
                                <a href={foundation.linkedIn} target="_blank" rel="noopener noreferrer">
                                    <img src="/LinkedIn-logo.png" alt="LinkedIn logo" className="w-6 h-6" />
                                </a>
                                <a href={foundation.instagram} target="_blank" rel="noopener noreferrer">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" alt="Instagram logo" className="w-6 h-6" />
                                </a>
                            </div>
                            <p className="description p-2 mb-1 text-xs text-justify lg:text-lg">{foundation.description}</p>

                            {/* Chips causes  */}
                            <div className="chips-container flex flex-wrap gap-1 lg:gap-5 justify-center">
                                {foundation.causes.map((eachCause) => {
                                    const foundCause = causas_arr.find((cause) => cause.name === eachCause);
                                    if (!foundCause) return null;
                                    return <Chip key={foundCause.name} label={foundCause.name} color={foundCause.color} />;
                                })}
                            </div>
                            {/* INTERVENTIONS TYPES SECTION */}
                            {
                                foundation.interventions?
                                    <section className="border border-slate-200 p-3 lg:mt-5">
                                        <h5>Tipo de intervenciones</h5>
                                        {
                                            <ul className="list-disc ml-4">
                                                {foundation.interventions.map((interventionType: string) => (
                                                    <li key={interventionType} className="text-sm lg:text-xl">{interventionType}</li>
                                                ))}
                                            </ul>
                                        }
                                    </section>
                                :null
                            }
                        </div>
                        <Link to={`/fundaciones/editar-fundacion/${foundation.id}`} className="absolute top-3 right-3" >
                            <Button className="edit-foundation" variant="secondary" size="sm">
                                    Editar
                            </Button>
                        </Link>
                        {/* INTERVENTIONS SECTION */}
                        <div className="interventions border-slate-500 my-2 rounded-2xl shadow-xl gap-3 p-3 w-[95%] md:max-w-[40%] md:m-auto flex flex-col md:min-h-[200px] items-center">
                            <p className=" font-medium text-xl text-gray-500 mb-0">Intervenciones recientes</p>
                            <Button variant="outline-primary" size="sm" className="mt-0" onClick={()=> setCreatingNewIntervention(true)}>
                                Nueva intervención
                            </Button>

                            {
                                creatingNewIntervention?(
                                    <form onSubmit={handleSubmitNewIntervention}>
                                    <div className={`new-intervention-card min-w-[95%] relative flex flex-col gap-3 px-4 pt-3 pb-2 bg-slate-100 border rounded-xl shadow-sm hover:shadow-md`}>
                                        <div className="flex gap-2 items-center">
                                        <input type="text" placeholder="Día" 
                                                className="w-[25%] py-0.5 px-1 border-1 border-slate-300 bg-white/100"
                                                value={formDataNewIntervention.intervention_date_day}
                                                onChange={handleOnChange}

                                        />
                                        <input type="text" placeholder="Mes" 
                                                className="w-[25%] py-0.5 px-1 border-1 border-slate-300 bg-white/100"
                                                value={formDataNewIntervention.intervention_date_month}
                                                onChange={handleOnChange}

                                        />
                                        <input required type="text" placeholder="Año" 
                                                className="w-[25%] py-0.5 px-1 border-1 border-slate-300 bg-white/100"
                                                name="intervention_date_year"
                                                value={formDataNewIntervention.intervention_date_year}
                                                onChange={handleOnChange}
                                        />
                                            
                                        </div>
                                        <textarea placeholder="Describe la intervención"
                                                name="description" 
                                                className="border-1 border-slate-300 p-1 bg-white/100"
                                                required
                                                value={formDataNewIntervention.description}
                                                onChange={handleOnChange}

                                        />
                                        <div className="flex justify-around">
                                            <Button variant="secondary" size="sm" onClick={()=>setCreatingNewIntervention(false)}>Cancelar</Button>
                                            <Button size="sm" type="submit">Publicar</Button>
                                        </div>
                                    </div>
                                    </form>
                                ): null                            
                            }

                            {/* Display all interventions */}
                            {interventions.map((eachIntervention : Intervention) => (
                                <InterventionCard key={eachIntervention.id} intervention={eachIntervention} cardType={"foundationProfile"} getInterventionsData={getInterventionsData}/>
                            ))
                            }
                        </div>

                    </div>
                </main>
            ) : (
                <h1>Foundation is null </h1>
            )
            }
        </>
    );
};
export default FoundationDetails;
