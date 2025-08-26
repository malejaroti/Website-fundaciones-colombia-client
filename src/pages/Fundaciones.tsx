import { useEffect, useState } from "react";
import { causas_arr } from "../data/causes_arr";
import { departamentos_ciudades_Colombia, type Departamento } from "../data/departments-cities";
import axios from "axios";
import Chip from "../components/Chip";
import MySelect from "../components/Select";

export type Foundation = {
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
    const [department, setDepartment] = useState<Departamento>({
        "name": "",
        "cities": []
    });
    const [allFoundations, setAllFoundations] = useState<Foundation[]>([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        getData();


    }, [])

    const getData = async () => {
        try {
            setIsFetching(true)
            const responseApi = await axios.get(`http://localhost:5005/foundations/`);
            // console.log(`Response API:`, responseApi.data);
            setAllFoundations(responseApi.data)
            setIsFetching(false)

        } catch (error) {
            console.log(error)
        }

    }
    // console.log(`cities in deparment: `, department.cities)

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
    console.log("departement state", department.name)
    return (
        <>

            <div className="h-[50px] flex items-center justify-center">
                <input type="text" placeholder="Search foundation by name"
                    className=" w-9/10 text-center border-slate-400 border rounded-sm" />

            </div>

            <div className="filters flex flex-col justify-around md:flex-row items-center gap-2 p-2 m-2 mb-3 ">
                <div className="selector-row flex gap-2">
                    <label > Departmento: </label>
                    <MySelect array={departamentos_ciudades_Colombia} name="department" id="department-select2" className="w-[210px]" onChange={handleDepartmentSelect}></MySelect>
                </div>

                <div className="selector-row flex gap-2">
                    <label > Ciudad: </label>
                    <MySelect array={department.cities} name="city" id="city-select" className="w-[210px]" onChange={handleDepartmentSelect}></MySelect>
                </div>

                <div className="selector-row flex gap-2">
                    <label > Causas: </label>
                    <MySelect array={causas_arr} name="cause" id="cause-select" className="w-[210px]" onChange={handleDepartmentSelect}></MySelect>
                </div>

            </div>
            <hr className="w-[80%] text-center m-auto text-slate-200" />
            <div className="cards-container flex flex-wrap items-center justify-center px-4">
                {
                    isFetching ?
                        <h1 className="text-center">Loading data ...</h1>

                        :
                        allFoundations
                            .filter((foundation) => department.name ? department.name === foundation.department : true)
                            .map((foundation) =>
                                <div key={foundation.name} className="foundation-card relative  border-slate-500 my-2 rounded-2xl shadow-xl gap-3 p-3 w-[95%] md:max-w-[40%] md:m-auto flex md:min-h-[200px] items-center">
                                    <div className="self-start flex flex-col items-center gap-4">
                                        <img className="foundation-logo self-start mt-2 min-w-20 h-20 shadow-2xl rounded-sm text-xs" src={foundation.logo} alt={`Logo ${foundation.name}`} />
                                        <div className="socials left-[20px] bottom-[10px] flex gap-2 md:gap-3">
                                            <a href={foundation.linkedIn} target="_blank" rel="noopener noreferrer">
                                                <img src="/LinkedIn-logo.png" alt="LinkedIn logo" className="w-6 h-6" />
                                            </a>
                                            <a href={foundation.instagram} target="_blank" rel="noopener noreferrer">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" alt="Instagram logo" className="w-6 h-6" />
                                            </a>
                                        </div>

                                    </div>
                                    <div className="card-text-side text-sm">
                                        <h1 className=" mb-1 text-lg font-bold text-amber-950">{foundation.name}</h1>
                                        <p className="mb-1 ">📍{foundation.city}, {foundation.department}</p>
                                        <p className="description p-1 mb-1 text-xs">{foundation.description}</p>
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
                                        {/* <div className="causas">{foundation.causes}</div> */}
                                    </div>
                                </div>
                            )
                }
            </div>
        </>
    )
}
export default Fundaciones                      