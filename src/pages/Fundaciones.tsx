import { useEffect, useState } from "react";
import { causas_arr } from "../data/causes_arr";
import { departamentos_ciudades_Colombia, type Departamento } from "../data/departments-cities";
import api from "../services/config.services";
import Chip from "../components/Chip";
import MySelect from "../components/MySelect";
import { useNavigate, useSearchParams } from "react-router-dom";
import iconGoToWebsite from "../assets/icon-go-to-website.png";
import {RingLoader} from "react-spinners";
// import axios from "axios";

export type Foundation = {
  id?: string;
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
  interventions?: string[]
};

function Fundaciones() {
  const navigate = useNavigate();
  const [allFoundations, setAllFoundations] = useState<Foundation[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [selectedCause, setSelectedCause] = useState("");
  const [department, setDepartment] = useState<Departamento>({
    name: "",
    cities: [],
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const homeSelectedCause = searchParams.get("causa");
  // const queryParams = new URLSearchParams(location.search);
  // const homeSelectedCause = queryParams.get("causa");

  // let allFoundationNames : Array<string> = allFoundations? allFoundations.map(foundation => foundation.name) : []
  // console.log("all foundation names", allFoundationNames)

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
    if (homeSelectedCause == null) return;
    setSelectedCause((prev) => (prev === homeSelectedCause ? prev : homeSelectedCause));

    // Clean the URL after applying the param
    const next = new URLSearchParams(searchParams);
    next.delete("causa");
    setSearchParams(next, { replace: true });
  }, [homeSelectedCause]);

  const getData = async () => {
    try {
      setIsFetching(true);
      
      const responseApi = await api.get("/foundations");
      setAllFoundations(responseApi.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const handleDepartmentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const depto = departamentos_ciudades_Colombia.find((d) => d.name === value);

    if (depto) {
      setDepartment(depto);
    } else {
      setDepartment({ name: "", cities: [] });
    }
  };

  const handleOnClickOnFoundationName = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const foundation = allFoundations.find((f) => f.name === e.currentTarget.textContent);
    if (foundation) {
      navigate(`/fundaciones/${foundation.id}`);
    }
  };

  const filteredFoundations = allFoundations
    .filter((foundation) => (searchedValue ? foundation.name.toLowerCase().includes(searchedValue.toLowerCase()) : true))
    .filter((foundation) => (department.name ? department.name === foundation.department : true))
    .filter((foundation) => (selectedCause ? foundation.causes.includes(selectedCause) : true));

  return (
    <main className="font-montserrat">
      {/* Page header, aligned with Home's gradient vibe */}
      <header className="p-6 md:p-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg mb-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold drop-shadow">Explora fundaciones</h1>
          <p className="text-sm md:text-base opacity-90">Busca por nombre, filtra por departamento y causa.</p>
        </div>
      </header>
      {isFetching ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <RingLoader
              color={'#79a4aa'}
              loading={isFetching}
              size={80}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <p className="text-center text-gray-500 mt-4">Cargando fundaciones</p>
          </div>
        </div>
      ) :
      <div className="max-w-6xl mx-auto px-4">
        {/* Search bar */}
        <div className="mb-4">
          <div className="bg-white rounded-2xl shadow-md ring-1 ring-blue-100 p-3 md:p-4">
            <input type="text" placeholder="Buscar fundación por nombre" className="w-full text-sm md:text-base px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder:text-gray-400" value={searchedValue} onChange={(e) => setSearchedValue(e.target.value)} />
          </div>
        </div>

        {/* Filters panel */}
        <section className="bg-white rounded-2xl shadow-md ring-1 ring-gray-100 p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs md:text-sm font-medium text-gray-600">Departamento</label>
              <MySelect array={departamentos_ciudades_Colombia} name="department" id="department-select2" onChange={handleDepartmentSelect} />
            </div>

            {/* <div className="flex flex-col gap-1">
              <label className="text-xs md:text-sm font-medium text-gray-600">Ciudad</label>
              <MySelect array={["Selecciona un departamento", ...department.cities]} name="city" id="city-select" onChange={handleDepartmentSelect} />
            </div> */}

            <div className="flex flex-col gap-1">
              <label className="text-xs md:text-sm font-medium text-gray-600">Causa</label>
              <MySelect array={causas_arr} otherAtributes={""} name="cause" id="cause-select" value={selectedCause} onChange={(e) => setSelectedCause(e.target.value)} />
            </div>
          </div>
        </section>

        {/* Results */}
        <section>
          {isFetching ? (
            <p className="text-center text-gray-500">Buscando fundaciones…</p>
          ) : filteredFoundations.length === 0 ? (
            <p className="my-6 text-slate-600 text-center">{selectedCause ? `Lo siento, no encontramos ninguna fundación con la causa “${selectedCause}”.` : "Lo siento, no encontramos ninguna fundación."}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {filteredFoundations.map((foundation) => (
                <article key={foundation.name} className="relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100 hover:shadow-lg transition">
                  {/* Accent bar */}
                  <span aria-hidden className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-400" />

                  <div className="p-4 md:p-5 flex gap-4">
                    <div className="flex flex-col items-center gap-3">
                      {foundation.logo && <img className="mt-1 size-20 min-w-20 rounded-md object-cover ring-1 ring-gray-200 shadow" src={foundation.logo} alt={`Logo ${foundation.name}`} />}
                      <div className="flex gap-2 md:gap-3">
                        {foundation.website ? (
                          <a href={foundation.website} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100">
                            <img src={iconGoToWebsite} alt="Ir al sitio web" className="w-6 h-6" />
                          </a>
                        ) : null}
                        {foundation.linkedIn ? (
                          <a href={foundation.linkedIn} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100">
                            <img src="/LinkedIn-logo.png" alt="LinkedIn" className="w-6 h-6" />
                          </a>
                        ) : null}
                        {foundation.instagram ? (
                          <a href={foundation.instagram} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-6 h-6" />
                          </a>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h2 className="mb-1 text-base md:text-lg font-bold text-amber-950 cursor-pointer hover:underline underline-offset-2" onClick={handleOnClickOnFoundationName}>
                        {foundation.name}
                      </h2>
                      <p className="mb-1 text-gray-600">
                        📍{foundation.city}, {foundation.department}
                      </p>
                      <p className="mb-2 text-sm md:text-base text-gray-700">{foundation.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {foundation.causes.map((eachCause) => {
                          const foundCause = causas_arr.find((cause) => cause.name === eachCause);
                          if (!foundCause) return null;
                          return <Chip key={foundCause.name} label={`${foundCause.icon} ${foundCause.name}`} color={foundCause.color} />;
                        })}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
      }
    </main>
  );
}

export default Fundaciones;
