import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <main className="h-full flex items-center justify-center px-4 font-montserrat lg:pt-70">
            <div className="w-full max-w-xl text-center bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-2xl p-6">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">404 · Lo siento, no encontramos tu página</h1>
                <Button variant="secondary" onClick={() => navigate(-1)}>Regresar</Button>
            </div>
        </main>
    )
}
export default NotFoundPage