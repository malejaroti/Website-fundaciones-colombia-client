import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { departamentos_ciudades_Colombia, type Departamento } from "../data/departments-cities";
import { causas_arr } from "../data/causes_arr";

import MySelect from "../components/Select";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import axios from "axios";
import type { Foundation } from "./Fundaciones.tsx";
import { useNavigate, useParams } from "react-router-dom";


function EditFoundation() {
  const params = useParams();
  const [foundation, setFoundation] = useState<Foundation | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [cities, setCities] = useState<string[]>([]);

  const [department, setDepartment] = useState<Departamento>({
    "name": "",
    "cities": []
  });

  const emptyForm: Foundation = {
    name: "",
    description: "",
    logo: "",
    department: "",
    city: "",
    website: "",
    linkedIn: "",
    instagram: "",
    causes: [],
    beneficiaries: []
  }
  const navigate = useNavigate()

  useEffect(() => {
    getFoundationData();
  }, []);

  const [formData, setFormData] = useState<Foundation>(emptyForm);
  const getFoundationData = async () => {
    try {
      setIsFetching(true);
      const { data } = await axios.get<Foundation>(`${import.meta.env.VITE_SERVER_URL}/foundations/${params.id}`);
      console.log(`Response API:`, data);
      setFoundation(data);
      setFormData(data);
      setIsFetching(false);

      const depto = departamentos_ciudades_Colombia.find((d) => d.name === data.department);
      if (depto) {
        setDepartment(depto);
        setCities(depto.cities);
        // console.log("cities:", cities)
      } else {
        setDepartment({ name: "", cities: [] });
        setCities([]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const animatedComponents = makeAnimated();
  const options = causas_arr.map(cause => ({
    value: cause.name,
    label: cause.name
  }));

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    console.log("event: ", event)
    console.log(event.currentTarget)
    const { name, value } = event.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "department") {
      const depto = departamentos_ciudades_Colombia.find((d) => d.name === value);
      if (depto) {
        setDepartment(depto);
        setCities(depto.cities);
      } else {
        setDepartment({ name: "", cities: [] });
        setCities([]);
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data } = await axios.patch<Foundation>(`${import.meta.env.VITE_SERVER_URL}/foundations/${params.id}`, formData);
    console.log(`Response  PATCH:`, data);

    navigate(-1);
  };



  return (
    <div>
      <h1 className="text-center my-2">Editar fundación</h1>
      <form onSubmit={handleSubmit} className="form m-auto p-2 text-center border w-[90%] flex flex-col">

        <label className="text-left">Nombre
          <input required className="w-full  mt-0 italic border border-slate-300 p-2 rounded-sm mb-3" name="name" type="text" value={formData.name} onChange={handleOnChange} />
        </label>

        <label className="text-left">Descripción
          <textarea required className="w-full min-h-[150px] italic border border-slate-300 p-2 rounded-sm mb-3" name="description" value={formData.description} onChange={handleOnChange} placeholder="Describe la misión de la fundación brevemente"></textarea>
        </label>

        <label className="text-left"> Logo
          {formData.logo && (
            <img src={formData.logo} alt="Foundation logo" className="w-20 h-20 m-2 border border-slate-400" />
          )}
          <input className="w-full break-all mt-0 italic border border-slate-300 p-2 rounded-sm mb-3" name="logo" type="text" placeholder="URL de logo de la fundación" value={formData.logo} onChange={handleOnChange} />
        </label>
        <label className="text-left"> Causas
          <Select
            className="mb-3"
            options={options}
            closeMenuOnSelect={false}
            isMulti
            components={animatedComponents}
            value={formData.causes.map((c) => ({ value: c, label: c }))}
            onChange={(selectedOptions) => {
              setFormData((prev) => ({
          ...prev,
          causes: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
              }));
            }}
          />
        </label>

        <br />

        <h5>Ubicación Sede Principal</h5>
        <label className="text-left"> Departamento </label>
        <MySelect array={departamentos_ciudades_Colombia} name="department" id="department-select2"
          value={formData.department} onChange={handleOnChange}></MySelect>

        <label className="text-left"> Ciudad
          <MySelect array={cities} name="city" id="city-select2" value={formData.city} onChange={handleOnChange}></MySelect>
        </label>

        <br />
        <h5>Redes sociales</h5>
        <label className="text-left"> Website
          <input className="w-full mt-0 italic border border-slate-300 p-2 rounded-sm mb-3" name="website" type="text" value={formData.website} onChange={handleOnChange} />
        </label>
        <label className="text-left"> LinkedIn
          <input className="w-full mt-0 italic border border-slate-300 p-2 rounded-sm mb-3" name="linkedin" type="text" value={formData.linkedIn} onChange={handleOnChange} />
        </label>
        <label className="text-left"> Instagram
          <input className="w-full mt-0 italic border border-slate-300 p-2 rounded-sm mb-3" name="instagram" type="text" value={formData.instagram} onChange={handleOnChange} />
        </label>

        <div className=" flex justify-center gap-5 my-3">

          <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button variant="primary"  type="submit">
            Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  )
}
export default EditFoundation