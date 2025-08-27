import { RiEditFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

// Format a date from intervention fields into "Sábado 16 abril, 2025" (Spanish).
// Accepts both underscore and hyphen field names and tolerates missing month/day.
function formatInterventionDate(i: any, locale: string = "es-CO"): string {
    const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
    const yearStr = i?.intervention_date_year ?? i?.["intervention-date-year"] ?? "";
    const monthStr = i?.intervention_date_month ?? i?.["intervention-date-month"] ?? "";
    const dayStr = i?.intervention_date_day ?? i?.["intervention-date-day"] ?? "";

    const year = parseInt(yearStr as string, 10);
    const hasYear = !!year && !Number.isNaN(year);
    const month = parseInt(monthStr as string, 10);
    const hasMonth = !!month && !Number.isNaN(month);
    const day = parseInt(dayStr as string, 10);
    const hasDay = !!day && !Number.isNaN(day);

    if (!hasYear) return "Fecha de la intervención no especificada";
    if (!hasMonth && !hasDay) return String(year);

    if (hasMonth && hasDay) {
        const date = new Date(year, Math.max(0, month - 1), day);
        const parts = new Intl.DateTimeFormat(locale, {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        }).formatToParts(date);
        const weekday = parts.find(p => p.type === "weekday")?.value || ""; // lowercase in es
        const monthName = parts.find(p => p.type === "month")?.value || "";  // lowercase in es
        const dayOut = parts.find(p => p.type === "day")?.value || "";
        const yearOut = parts.find(p => p.type === "year")?.value || "";
        return [cap(weekday), dayOut, monthName].filter(Boolean).join(" ") + (yearOut ? `, ${yearOut}` : "");
    }

    if (hasMonth && !hasDay) {
        // Only month and year
        const date = new Date(year, Math.max(0, month - 1), 1);
        const monthName = new Intl.DateTimeFormat(locale, { month: "long" }).format(date);
        return `${monthName}, ${year}`;
    }

    // Day without month is ambiguous; show year only per requirement
    return String(year);
}

function InterventionCard({ intervention, cardType }) {
    return (
        <>
            <div
                key={intervention.id}
                className="intervention-card relative flex flex-col gap-3 p-4 bg-white/90 border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-200"
            >
                <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-blue-500 to-pink-500" aria-hidden />

                <div className="flex items-center gap-3">
                    <img
                        src={intervention.foundation?.logo || undefined}
                        alt={`Logo ${intervention.foundation?.name ?? ""}`}
                        className={`size-12 rounded-full object-cover ring-2 ring-purple-200 ${cardType === "feed" ? "block" : "hidden"}`}
                    />
                    <div className="leading-tight">
                        <p className={`mb-0 font-semibold text-slate-800 ${cardType === "feed" ? "block" : "hidden"}`}>
                            {intervention.foundation?.name}
                        </p>
                        <p className="mb-0 text-xs text-slate-500">
                            {formatInterventionDate(intervention, "es-CO")}
                        </p>
                    </div>
                </div>

                <p className="intervention-text bg-slate-50 border border-slate-200 rounded-lg p-3 text-justify text-slate-700">
                    {intervention.description}
                </p>
                <div className="flex gap-1 absolute right-3 top-2.5">
                    <RiEditFill className="text-slate-300 size-4" />
                    <FaTrash className="text-slate-300 size-4" />
                </div>
            </div>

        </>
    )
}
export default InterventionCard