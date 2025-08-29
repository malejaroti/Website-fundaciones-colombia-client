import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { departamentos_ciudades_Colombia } from "../data/departments-cities";
import { causas_arr } from "../data/causes_arr";

import MySelect from "../components/MySelect.tsx";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import axios from "axios";
import type { Foundation } from "./Fundaciones.tsx";
import { useNavigate } from "react-router-dom";


function AddFoundation() {
  const navigate = useNavigate()
  const [cities, setCities] = useState<string[]>([]);
  const data = {
    name: "",
    description: "",
    department: "",
    city: "",
    website: "",
    linkedIn: "",
    instagram: "",
    causes: [],
    beneficiaries: []
  }
  const [formData, setFormData] = useState<Foundation>({
    name: data.name,
    description: data.description,
    logo: "",
    department: data.department,
    city: data.city,
    website: data.website,
    linkedIn: data.linkedIn,
    instagram: data.instagram,
    causes: data.causes,
    beneficiaries: data.beneficiaries,
  });

  const animatedComponents = makeAnimated();
  const options = causas_arr.map(cause => ({
    value: cause.name,
    label: cause.name
  }));


  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "department") {
      const depto = departamentos_ciudades_Colombia.find((d) => d.name === value);
      if (depto) {
        setCities(depto.cities);
      } else {
        setCities([]);
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newFoundation: Foundation = {
      name: formData.name,
      description: formData.description,
      logo: formData.logo ? formData.logo : "",
      department: formData.department,
      city: formData.city,
      website: formData.website,
      linkedIn: formData.linkedIn,
      instagram: formData.instagram,
      causes: formData.causes,
      beneficiaries: formData.beneficiaries,
    };

    await axios.post(`${import.meta.env.VITE_SERVER_URL}/foundations/`, newFoundation)
    navigate(-1);
  };

  return (
    <div>
      <header className="font-montserrat p-6 md:p-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg mb-6">
        <div className="max-w-6xl mx-auto">
          <h1 className=" text-2xl md:text-3xl font-semibold drop-shadow">Añadir fundación</h1>
        </div>
      </header>
      <form onSubmit={handleSubmit} className="form m-auto p-3 text-center border w-[90%] flex flex-col rounded-lg lg:w-[60%]">

        <label className="text-left">Nombre
          <input required className="w-full  mt-0 font-medium border border-slate-300 p-2 rounded-sm mb-3" name="name" type="text" value={formData.name} onChange={handleOnChange} />
        </label>

        <label className="text-left" >Descripción
          <textarea required className="w-full font-medium border border-slate-300 p-2 rounded-sm mb-3" name="description" value={formData.description} onChange={handleOnChange} placeholder="Describe la misión de la fundación brevemente"></textarea>
        </label>

        <label className="text-left"> Logo
          <input className="w-full mt-0 font-medium border border-slate-300 p-2 rounded-sm mb-3" name="logo" type="text" placeholder="URL de logo de la fundación" value={formData.logo} onChange={handleOnChange} />
        </label>
        <label className="text-left"> Causas
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            className="mb-3"
          />
        </label>
        <br />
        <h5>Ubicación Sede Principal</h5>
        <label className="text-left"> Departamento </label>
        <MySelect array={departamentos_ciudades_Colombia} name="department" id="department-select2"
          value={formData.department} onChange={handleOnChange}></MySelect>

        <label className="text-left"> Ciudad
          <MySelect array={cities} name="city" id="city-select2"></MySelect>
        </label>

        <br />
        <h5>Redes sociales</h5>
        <label className="text-left"> Website
          <input className="w-full mt-0 font-medium border border-slate-300 p-2 rounded-sm mb-3" name="website" type="text" value={formData.website} onChange={handleOnChange} />
        </label>
        <label className="text-left"> LinkedIn
          <input className="w-full mt-0 font-medium border border-slate-300 p-2 rounded-sm mb-3" name="linkedin" type="text" value={formData.linkedIn} onChange={handleOnChange} />
        </label>
        <label className="text-left"> Instagram
          <input className="w-full mt-0 font-medium border border-slate-300 p-2 rounded-sm mb-3" name="instagram" type="text" value={formData.instagram} onChange={handleOnChange} />
        </label>

        <Button className="m-5 p-3 rounded-sm text-cyan-700 md:cursor-pointer shadow-md shadow-blue-300 hover:relative hover:top-0.5 hover:left-0.5 lg:w-[20%] lg:self-center" type="submit">
          Añadir
        </Button>
      </form>
    </div>
  )
}
export default AddFoundation