import type { TailwindColor } from "../types/TailwindColor";

export type CauseColor = {
  name: string;
  color: TailwindColor;
}

export const causas_arr: CauseColor[] = [
  { name: "Acceso a Justicia", color: "slate" },
  { name: "Acción Humanitaria y Emergencias", color: "red" },
  { name: "Agua y Saneamiento Básico", color: "sky" },
  { name: "Ciencia y Divulgación", color: "indigo" },
  { name: "Construcción de Paz y Reconciliación", color: "emerald" },
  { name: "Consumo Responsable y Economía Circular", color: "lime" },
  { name: "Cultura y Arte", color: "purple" },
  { name: "Deporte y Recreación", color: "orange" },
  { name: "Desarrollo Sostenible (ODS)", color: "green" },
  { name: "Derechos Humanos", color: "rose" },
  { name: "Educación", color: "amber" },
  { name: "Empleo y Emprendimiento", color: "teal" },
  { name: "Equidad de Género", color: "fuchsia" },
  { name: "Espiritualidad y Valores", color: "violet" },
  { name: "Innovación y Tecnología Social", color: "cyan" },
  { name: "Medio Ambiente", color: "green" },
  { name: "Movilidad y Transporte Sostenible", color: "sky" },
  { name: "Participación Ciudadana", color: "blue" },
  { name: "Prevención de Violencia", color: "red" },
  { name: "Protección Animal", color: "lime" },
  { name: "Protección del Patrimonio Histórico", color: "stone" },
  { name: "Reducción de Pobreza", color: "pink" },
  { name: "Salud", color: "rose" },
  { name: "Salud Mental", color: "indigo" },
  { name: "Seguridad Alimentaria y Nutrición", color: "yellow" },
  { name: "Transparencia y Buen Gobierno", color: "neutral" },
  { name: "Vivienda y Hábitat Digno", color: "zinc" },
  { name: "Voluntariado y Servicio Comunitario", color: "teal" }
];

// export const causeColorByName: Record<string, TailwindColor> = Object.fromEntries(
//   causas.map(c => [c.name, c.color])
// ) as Record<string, TailwindColor>;
