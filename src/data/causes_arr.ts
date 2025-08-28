import type { TailwindColor } from "../types/TailwindColor";

export type CauseColor = {
  name: string;
  color: TailwindColor;
  icon: string; // emoji representing the cause
  showInHome: boolean; // whether to feature in Home grid
}

export const causas_arr: CauseColor[] = [
  { name: "Acceso a Justicia", color: "slate", icon: "⚖️", showInHome: false },
  { name: "Acción Humanitaria y Emergencias", color: "red", icon: "🆘", showInHome: false },
  { name: "Agua y Saneamiento Básico", color: "sky", icon: "💧", showInHome: false },
  { name: "Ciencia y Divulgación", color: "indigo", icon: "🔬", showInHome: false },
  { name: "Construcción de Paz y Reconciliación", color: "emerald", icon: "🕊️", showInHome: false },
  { name: "Consumo Responsable y Economía Circular", color: "lime", icon: "♻️", showInHome: false },
  { name: "Cultura y Arte", color: "purple", icon: "🎭", showInHome: true },
  { name: "Deporte y Recreación", color: "orange", icon: "⚽", showInHome: true },
  { name: "Desarrollo Sostenible (ODS)", color: "green", icon: "🌱", showInHome: true },
  { name: "Derechos Humanos", color: "rose", icon: "🤝", showInHome: false },
  { name: "Educación", color: "amber", icon: "🎓", showInHome: true },
  { name: "Empleo y Emprendimiento", color: "teal", icon: "💼", showInHome: false },
  { name: "Equidad de Género", color: "fuchsia", icon: "👩‍🤝‍👨", showInHome: true },
  { name: "Espiritualidad y Valores", color: "violet", icon: "🙏", showInHome: false },
  { name: "Innovación y Tecnología Social", color: "cyan", icon: "💡", showInHome: false },
  { name: "Medio Ambiente", color: "green", icon: "🌿", showInHome: true },
  { name: "Movilidad y Transporte Sostenible", color: "sky", icon: "🚴‍♂️", showInHome: false },
  { name: "Participación Ciudadana", color: "blue", icon: "🗳️", showInHome: false },
  { name: "Prevención de Violencia", color: "red", icon: "🛡️", showInHome: false },
  { name: "Protección Animal", color: "lime", icon: "🐾", showInHome: true },
  { name: "Protección del Patrimonio Histórico", color: "stone", icon: "🏛️", showInHome: false },
  { name: "Reducción de Pobreza", color: "pink", icon: "🤲", showInHome: false },
  { name: "Salud", color: "rose", icon: "🏥", showInHome: true },
  { name: "Salud Mental", color: "indigo", icon: "🧠", showInHome: false },
  { name: "Seguridad Alimentaria y Nutrición", color: "yellow", icon: "🍎", showInHome: false },
  { name: "Transparencia y Buen Gobierno", color: "neutral", icon: "🔍", showInHome: false },
  { name: "Vivienda y Hábitat Digno", color: "zinc", icon: "🏠", showInHome: false },
  { name: "Voluntariado y Servicio Comunitario", color: "teal", icon: "🙌", showInHome: false }
];

// export const causeColorByName: Record<string, TailwindColor> = Object.fromEntries(
//   causas.map(c => [c.name, c.color])
// ) as Record<string, TailwindColor>;
