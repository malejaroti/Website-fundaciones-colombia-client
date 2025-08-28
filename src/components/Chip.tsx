import type { TailwindColor } from "../types/TailwindColor";

export type ChipProps = {
    label: string;
    color: TailwindColor;
};

const chipColors: Record<TailwindColor, string> = {
    slate: "border-slate-900 bg-slate-50 text-slate-900",
    gray: "border-gray-900 bg-gray-50 text-gray-900",
    zinc: "border-zinc-900 bg-zinc-50 text-zinc-900",
    neutral: "border-neutral-900 bg-neutral-50 text-neutral-900",
    stone: "border-stone-900 bg-stone-50 text-stone-900",
    red: "border-red-900 bg-red-50 text-red-900",
    orange: "border-orange-900 bg-orange-50 text-orange-900",
    amber: "border-amber-900 bg-amber-50 text-amber-900",
    yellow: "border-yellow-900 bg-yellow-50 text-yellow-900",
    lime: "border-lime-900 bg-lime-50 text-lime-900",
    green: "border-green-900 bg-green-50 text-green-900",
    emerald: "border-emerald-900 bg-emerald-50 text-emerald-900",
    teal: "border-teal-900 bg-teal-50 text-teal-900",
    cyan: "border-cyan-900 bg-cyan-50 text-cyan-900",
    sky: "border-sky-900 bg-sky-50 text-sky-900",
    blue: "border-blue-900 bg-blue-50 text-blue-900",
    indigo: "border-indigo-900 bg-indigo-50 text-indigo-900",
    violet: "border-violet-900 bg-violet-50 text-violet-900",
    purple: "border-purple-900 bg-purple-50 text-purple-900",
    fuchsia: "border-fuchsia-900 bg-fuchsia-50 text-fuchsia-900",
    pink: "border-pink-900 bg-pink-50 text-pink-900",
    rose: "border-rose-900 bg-rose-50 text-rose-900",
};

function Chip({ label, color }: ChipProps) {
    const chipColor = chipColors[color]
    return (

        <div className={`chip w-fit text-xs px-1 pb-0.5 text-center border ${chipColor} rounded-sm lg:text-lg`}>
            {label}
        </div>
    )
}
export default Chip