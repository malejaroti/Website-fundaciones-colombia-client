import { useEffect, useState } from "react";
import { causas_arr } from "../data/causes_arr";
import { departamentos_ciudades_Colombia, type Departamento } from "../data/departments-cities";
import axios from "axios";
import Chip from "../components/Chip";
import MySelect from "../components/Select";
import { useNavigate, useSearchParams } from "react-router-dom";
import iconGoToWebsite from '../assets/icon-go-to-website.png';


export type Foundation = {
    id?: string, 
    name: string;
    description: string;
    department: string;
    city: string;
    causes: string[];
    beneficiaries: string[];
    logo: string;
    linkedIn: string;
    instagram: string;
    website: string;
};

function Fundaciones() {
    
    const navigate = useNavigate()
    const [allFoundations, setAllFoundations] = useState<Foundation[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [searchedValue, setSearchedValue] = useState("");
    const [selectedCause, setSelectedCause] = useState("");
    const [department, setDepartment] = useState<Departamento>({
        "name": "",
        "cities": []
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const homeSelectedCause = searchParams.get("causa");
    // const queryParams = new URLSearchParams(location.search);
    // const homeSelectedCause = queryParams.get("causa");
    
    // let allFoundationNames : Array<string> = allFoundations? allFoundations.map(foundation => foundation.name) : []
    // console.log("all foundation names", allFoundationNames)
    
    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        getData();
        if (homeSelectedCause == null) return;
        setSelectedCause(prev => (prev === homeSelectedCause ? prev : homeSelectedCause));

        // Clean the URL after applying the param
        const next = new URLSearchParams(searchParams);
        next.delete("causa");
        setSearchParams(next, { replace: true });
    }, [homeSelectedCause])

    const getData = async () => {
        try {
            setIsFetching(true)
            const responseApi = await axios.get(`${import.meta.env.VITE_SERVER_URL}/foundations/`);
            // console.log(`Response API:`, responseApi.data);
            setAllFoundations(responseApi.data)
            setIsFetching(false)


        } catch (error) {
            console.log(error)
        }

    }

    const handleDepartmentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const depto = departamentos_ciudades_Colombia.find((d) => d.name === value);

        if (depto) {
            setDepartment(depto);
            console.log("depto :", depto)
        } else {
            setDepartment({ name: "", cities: [] });
        }
    }

    const handleOnClickOnFoundationName = (e: React.MouseEvent<HTMLHeadingElement>) => {
        const foundation = allFoundations.find((f) => f.name === e.currentTarget.textContent);      
        if(foundation){
            navigate(`/fundaciones/${foundation.id}`)
        }
    }

    const filteredFoundations = allFoundations
        .filter((foundation) => (searchedValue ? foundation.name.includes(searchedValue) : true))
        .filter((foundation) => (department.name ? department.name === foundation.department : true))
        .filter((foundation) => (selectedCause ? foundation.causes.includes(selectedCause) : true));
    return (
        <>
            {/* Search bar */}
            <div className="h-[50px] flex items-center justify-center">
                <input type="text" placeholder="Search foundation by name"
                    className=" w-9/10 text-center border-slate-400 border rounded-sm" 
                    value={searchedValue}
                    onChange={(e) => setSearchedValue(e.target.value)}/>

            </div>

            {/* Search filters */}
            <div className="filters flex flex-col justify-around md:flex-row items-center gap-2 p-2 ">
                <div className="selector-row flex gap-2">
                    <label > Departmento: </label>
                    <MySelect array={departamentos_ciudades_Colombia} name="department" id="department-select2" onChange={handleDepartmentSelect}></MySelect>
                </div>

                <div className="selector-row flex gap-2">
                    <label > Ciudad: </label>
                    <MySelect
                        array={["Selecciona un departamento", ...department.cities]}
                        name="city"
                        id="city-select"
                        onChange={handleDepartmentSelect}
                    ></MySelect>
                </div>

                <div className="selector-row flex gap-2">
                    <label > Causas: </label>
                    <MySelect array={causas_arr} otherAtributes={""} name="cause" id="cause-select"  
                    value={selectedCause} onChange={(e) => setSelectedCause(e.target.value)}></MySelect>
                </div>

            </div>
            <hr className="w-[90%] text-center m-auto text-slate-50 my-2" />

            {/* All foundations searched */}
            <div className="cards-container flex flex-wrap items-center justify-center px-4">
                {
                    isFetching ?(
                        <h1 className="text-center">Cargando fundaciones ...</h1>

                    ): filteredFoundations.length === 0 ? (
                        <p className="my-6 text-slate-600 text-center">
                        {selectedCause
                            ? `Lo siento, no encontramos ninguna fundación con la causa “${selectedCause}”.`
                            : "Lo siento, no encontramos ninguna fundación."}
                        </p>
                    ) :
                    filteredFoundations.map((foundation) => {
                        return <div key={foundation.name} className="foundation-card relative border border-slate-500 my-2 rounded-2xl shadow-xl gap-3 p-3 w-[95%]  md:m-auto flex md:min-h-[200px] items-center">
                            <div className="self-start flex flex-col items-center gap-4">
                                {foundation.logo && 
                                    <img className="foundation-logo self-start mt-2 min-w-20 h-20 shadow-2xl rounded-sm text-xs" src={foundation.logo} alt={`Logo ${foundation.name}`} />
                                }
                                <div className="socials left-[20px] bottom-[10px] flex gap-2 md:gap-3">
                                    {foundation.website? (
                                        <a href={foundation.website} target="_blank" rel="noopener noreferrer">
                                            <img src={iconGoToWebsite} alt="Icon for go to website" className="w-6 h-6" />
                                        </a>
                                        ): (null)}
                                    {foundation.linkedIn? (
                                        <a href={foundation.linkedIn} target="_blank" rel="noopener noreferrer">
                                            <img src="/LinkedIn-logo.png" alt="LinkedIn logo" className="w-6 h-6" />
                                        </a>
                                    ): (null)}

                                    {foundation.instagram? (
                                        <a href={foundation.instagram} target="_blank" rel="noopener noreferrer">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" alt="Instagram logo" className="w-6 h-6" />
                                        </a>
                                    ): (null)}
                                </div>

                            </div>
                            <div className="card-text-side text-sm">
                                <h2 className=" mb-1 text-base font-bold text-amber-950" onClick={handleOnClickOnFoundationName} >{foundation.name}</h2>
                                <p className="mb-1 ">📍{foundation.city}, {foundation.department}</p>
                                <p className="description p-1 mb-1 text-xs lg:text-lg">{foundation.description}</p>
                                <div className="chips-container flex flex-wrap gap-1">
                                    {foundation.causes.map((eachCause) => {
                                        const foundCause = causas_arr.find((cause) => cause.name === eachCause)
                                        if (!foundCause) return null;
                                        return (
                                            <Chip
                                                key={foundCause.name}
                                                label={foundCause.name}
                                                color={foundCause.color}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}
export default Fundaciones                      