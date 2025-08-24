// src/data/departamentoscities.ts

export interface Departamento {
  name: string;
  cities: string[];
}

export const departamentos_ciudades_Colombia: Departamento[] = [
  { name: "Amazonas", cities: ["Leticia", "Puerto Nariño", "La Pedrera"] },
  { name: "Antioquia", cities: ["Medellín", "Bello", "Itagüí"] },
  { name: "Arauca", cities: ["Arauca", "Saravena", "Tame"] },
  { name: "Atlántico", cities: ["Barranquilla", "Soledad", "Malambo"] },
  { name: "Bolívar", cities: ["Cartagena", "Magangué", "Turbaco"] },
  { name: "Boyacá", cities: ["Tunja", "Duitama", "Sogamoso"] },
  { name: "Caldas", cities: ["Manizales", "La Dorada", "Chinchiná"] },
  { name: "Caquetá", cities: ["Florencia", "San Vicente del Caguán", "Puerto Rico"] },
  { name: "Casanare", cities: ["Yopal", "Aguazul", "Villanueva"] },
  { name: "Cauca", cities: ["Popayán", "Santander de Quilichao", "Puerto Tejada"] },
  { name: "Cesar", cities: ["Valledupar", "Aguachica", "La Jagua de Ibirico"] },
  { name: "Chocó", cities: ["Quibdó", "Istmina", "Tadó"] },
  { name: "Córdoba", cities: ["Montería", "Lorica", "Sahagún"] },
  { name: "Cundinamarca", cities: ["Soacha", "Girardot", "Facatativá"] },
  { name: "Guainía", cities: ["Inírida", "Barranco Minas", "Mapiripana"] },
  { name: "Guaviare", cities: ["San José del Guaviare", "El Retorno", "Calamar"] },
  { name: "Huila", cities: ["Neiva", "Pitalito", "Garzón"] },
  { name: "La Guajira", cities: ["Riohacha", "Maicao", "Uribia"] },
  { name: "Magdalena", cities: ["Santa Marta", "Ciénaga", "Fundación"] },
  { name: "Meta", cities: ["Villavicencio", "Granada", "Acacías"] },
  { name: "Nariño", cities: ["Pasto", "Ipiales", "Tumaco"] },
  { name: "Norte de Santander", cities: ["Cúcuta", "Ocaña", "Pamplona"] },
  { name: "Putumayo", cities: ["Mocoa", "Puerto Asís", "Orito"] },
  { name: "Quindío", cities: ["Armenia", "Calarcá", "La Tebaida"] },
  { name: "Risaralda", cities: ["Pereira", "Dosquebradas", "Santa Rosa de Cabal"] },
  { name: "San Andrés y Providencia", cities: ["San Andrés", "Providencia", "Santa Catalina"] },
  { name: "Santander", cities: ["Bucaramanga", "Floridablanca", "Barrancabermeja"] },
  { name: "Sucre", cities: ["Sincelejo", "Corozal", "San Marcos"] },
  { name: "Tolima", cities: ["Ibagué", "Espinal", "Melgar"] },
  { name: "Valle del Cauca", cities: ["Cali", "Palmira", "Buenaventura"] },
  { name: "Vaupés", cities: ["Mitú", "Carurú", "Taraira"] },
  { name: "Vichada", cities: ["Puerto Carreño", "La Primavera", "Santa Rosalía"] },
  { name: "Bogotá, D.C.", cities: ["Bogotá"] } // Distrito Capital
];
