// CausesSection.tsx
import { causas_arr } from "../data/causes_arr";
import { Link } from "react-router-dom";

function CausesSection() {
    return (
        <section className="bg-white py-10 px-6 font-montserrat">
            <h2 className=" text-2xl font-bold text-gray-800 text-center mb-6">
                Explora por Causa
            </h2>

            {/* Grid responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mx-auto">
                {causas_arr.filter(c => c.showInHome).map((cause) => (
                    <Link
                        key={cause.name}
                        // to={`/fundaciones?causa=${cause.name}`}
                        to={`/fundaciones?causa=${encodeURIComponent(cause.name)}`}
                        className="group no-underline flex flex-col items-center justify-center bg-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:bg-blue-50 transition"
                    >
                        <span className="text-3xl mb-1.5">{cause.icon}</span>
                        <p className="text-xs font-medium text-gray-700 text-center underline decoration-slate-400 ">
                            {cause.name}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default CausesSection;
