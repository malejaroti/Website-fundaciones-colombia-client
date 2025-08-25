import { useEffect, useState } from "react";
import { departamentosColombia } from "../data/departamentos"
import { causas } from "../data/causas";
import { departamentos_ciudades_Colombia, type Departamento } from "../data/departments-cities";
import axios from "axios";

type Foundation = {
    logo: string;
    name: string;
    linkedIn: string;
    instagram: string;
    city: string;
    department: string;
    description: string;
    causes: string;
};

function Fundaciones() {
    const [department, setDepartment] = useState<Departamento>({
        "name": "",
        "cities": []
    });
    const [allFoundations, setAllFoundations] = useState<Foundation[]>([]);

    useEffect(() => {
        getData();


    }, [])

    const getData = async () => {
        try {
            const responseApi = await axios.get(`http://localhost:5005/foundations/`);
            // console.log(`Response API:`, responseApi.data);
            setAllFoundations(responseApi.data)

        } catch (error) {
            console.log(error)
        }

    }


    console.log(`cities in deparment: `, department.cities)

    const handleDepartmentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const depto = departamentos_ciudades_Colombia.find((d) => d.name === value);

        if (depto) {
            setDepartment(depto);
        } else {
            setDepartment({ name: "", cities: [] });
        }
    }


    return (
        <div className="h-screen overflow-y-scroll border-6 border-amber-800 mt-[66px]">

            <div className="h-[50px] flex items-center justify-center">
                <input type="text" placeholder="Search foundation by name"
                    className=" w-9/10 text-center border-slate-400 border rounded-sm" />

            </div>

            <div className="filters flex flex-col justify-around md:flex-row items-center gap-2 p-2 ">

                <div className="selector-row flex gap-2 justify-between ">
                    <label > Departamento: </label>
                    <select name="department" id="department-select" className="w-[210px]" onChange={handleDepartmentSelect}>
                        <option value=""></option>
                        {departamentos_ciudades_Colombia.map((eachDepartment) => (
                            <option key={eachDepartment.name}> {eachDepartment.name}</option>
                        ))}
                    </select>
                </div>
                <div className="selector-row flex gap-2">
                    <label > Ciudad: </label>
                    <select name="department" id="department-select" className="w-[210px]" >
                        <option value=""></option>
                        {department.cities.map((eachCity) => (
                            <option key={eachCity} value={eachCity} > {eachCity}</option>
                        ))}
                    </select>
                </div>
                <div className="selector-row flex gap-2 ">
                    <label > Causa: </label>
                    <select name="causa" id="causa-select" className="w-[210px] text-xs">
                        <option value=""></option>
                        {causas.map((department) => (
                            <option key={department} value={department} > {department}</option>
                        ))}
                    </select>
                </div>
                <div className="selector-row flex gap-2 ">
                    <label > Beneficiarios: </label>
                    <select name="beneficiarios" id="beneficiarios-select" className="w-[210px]">
                        <option value=""></option>
                        {causas.map((eachBenefitiaryType) => (
                            <option key={eachBenefitiaryType} value={eachBenefitiaryType} > {eachBenefitiaryType}</option>
                        ))}
                    </select>
                </div>

            </div>

            {
                allFoundations.map((foundation) => (
                    <div className="foundation-card  relative flex border-slate-500 rounded-2xl shadow-xl m-5 items-center gap-3 p-3">
                        <img className="logo self-start mt-2 min-w-20 h-20 shadow-2xl rounded-sm" src={foundation.logo} alt={`Logo ${foundation.name}`} />
                        <div className="socials absolute right-[20px] top-[10px] flex gap-1 md:gap-3">
                            <a href={foundation.linkedIn} target="_blank" rel="noopener noreferrer">
                                <img src="/LinkedIn-logo.png" alt="LinkedIn logo" className="w-6 h-6" />
                            </a>
                            <a href={foundation.instagram} target="_blank" rel="noopener noreferrer">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" alt="Instagram logo" className="w-6 h-6" />
                            </a>
                        </div>
                        <div className="card-text-side text-sm">
                            <h1 className=" mb-1 text-lg font-bold text-amber-950">{foundation.name}</h1>
                            <p className="mb-1 ">📍{foundation.city}, {foundation.department}</p>
                            <p className="mb-1 text-xs">{foundation.description}</p>
                            <div className="causas">{foundation.causes}</div>
                        </div>
                    </div>
                ))
            }
        </div >
    )
}
export default Fundaciones                      