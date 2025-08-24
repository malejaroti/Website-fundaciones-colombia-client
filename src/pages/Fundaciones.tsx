import { useState } from "react";
import { departamentosColombia } from "../data/departamentos"
import { causas } from "../data/causas";
import { departamentos_ciudades_Colombia, type Departamento } from "../data/departments-cities";

function Fundaciones() {
    const [department, setDepartment] = useState<Departamento>({
        "name": "",
        "cities": []
    });

    console.log(`cities in deparment:`, department.cities)

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
        <div className="h-screen border-6 border-amber-800 mt-[66px]">

            <div className="h-[50px] flex items-center justify-center">
                <input type="text" placeholder="Search foundation by name"
                    className=" w-9/10 text-center border-slate-400 border rounded-sm" />

            </div>

            <div className="filters flex flex-col justify-around md:flex-row items-center gap-2 p-2 ">

                <div className="selector-row flex gap-2 justify-between ">
                    <label > Departamento: </label>
                    <select name="department" id="department-select" className="w-[210px]" onChange={handleDepartmentSelect}>
                        {departamentos_ciudades_Colombia.map((eachDepartment) => (
                            <option key={eachDepartment.name}> {eachDepartment.name}</option>
                        ))}
                    </select>
                </div>
                <div className="selector-row flex gap-2">
                    <label > Ciudad: </label>
                    <select name="department" id="department-select" className="w-[210px]" >
                        {

                            department.cities.map((eachCity) => (
                                <option key={eachCity} value={eachCity} > {eachCity}</option>
                            ))}
                    </select>
                </div>
                <div className="selector-row flex gap-2 ">
                    <label > Causa: </label>
                    <select name="causa" id="causa-select" className="w-[210px] text-xs">
                        {causas.map((department) => (
                            <option key={department} value={department} > {department}</option>
                        ))}
                    </select>
                </div>
                <div className="selector-row flex gap-2 ">
                    <label > Beneficiarios: </label>
                    <select name="beneficiarios" id="beneficiarios-select" className="w-[210px]">
                        {causas.map((eachBenefitiaryType) => (
                            <option key={eachBenefitiaryType} value={eachBenefitiaryType} > {eachBenefitiaryType}</option>
                        ))}
                    </select>
                </div>

            </div>
        </div >
    )
}
export default Fundaciones                      