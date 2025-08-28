import { useEffect, useRef, useState, type ReactEventHandler } from 'react';
import { RiEditFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import type { Intervention } from '../types/Intervention';

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

function InterventionCard({ intervention, cardType, getInterventionsData }) {

    const [show, setShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(intervention.description);
    const draftRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => { 
        if (isEditing && draftRef.current){
            draftRef.current.textContent = draft; 
        }
    }, [isEditing]);

    const handleClose = () => setShow(false);

    const handleConfirmDeletion = () => {
        getInterventionsData()
        setShow(false);
    }

    const handleClickOnTrash = async () => {
        console.log("interventionId:", intervention.id)
        await axios.delete(`${import.meta.env.VITE_SERVER_URL}/interventions/${intervention.id}`);
        setShow(true);
    }

    const handleClickOnEdit = () => {
        setIsEditing(true)
    }

    const handleInterventionDescriptionChange = (e: React.FormEvent<HTMLParagraphElement>) => {
        setDraft(e.currentTarget.textContent ?? "")
    }

    const handleCancelInterventionEdit = () => {
        setDraft(intervention.description)
        setIsEditing(false)
    }

    const handleSaveChanges = async () => {
        const updatedIntervention = {
            ...intervention,
            ["description"]: draft
        }
        console.log("updated intervention: ", updatedIntervention)
        axios.patch<Intervention>(`${import.meta.env.VITE_SERVER_URL}/interventions/${intervention.id}`, updatedIntervention);
        setIsEditing(false)
    }

    return (
        <>
            <div
                key={intervention.id}
                className="intervention-card min-w-[95%] relative flex flex-col gap-3 p-4 bg-white/90 border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-200"
            >
                <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-blue-500 to-pink-500" aria-hidden />

                <div className="flex items-center gap-3">
                    <img
                        src={intervention.foundation?.logo || undefined}
                        alt={`Logo ${intervention.foundation?.name ?? ""}`}
                        className={`size-12 rounded-full object-cover ring-2 ring-purple-200 ${cardType === "feed" ? "block" : "hidden"}`}
                    />
                    <div className="leading-tight">
                        <Link to={`/fundaciones/${intervention.foundationId}`}>
                            <p className={`mb-0 font-semibold text-slate-800 ${cardType === "feed" ? "block" : "hidden"}`}>
                                {intervention.foundation?.name}
                            </p>
                        </Link>
                        <p className="mb-0 text-xs text-slate-500">
                            {formatInterventionDate(intervention, "es-CO")}
                        </p>
                    </div>
                </div>
                <p
                    ref={draftRef}
                    className={`intervention-text border-slate-200 rounded-lg p-3 text-justify text-slate-700 ${isEditing ? "bg-slate-200 italic" : " bg-slate-50 border"}`}
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onInput={handleInterventionDescriptionChange}
                >
                     {!isEditing ? draft : null} 
                </p>

                <div className={`flex gap-4 ${isEditing ? `block` : "hidden"}`}>
                    <Button variant="secondary" onClick={handleCancelInterventionEdit}>Cancelar</Button>
                    <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
                </div>

                <div className={`flex gap-1 absolute right-3 top-2.5 ${cardType === "foundationProfile" ? "block" : "hidden"}`}>
                    <RiEditFill className="text-slate-300 size-4" onClick={handleClickOnEdit} />
                    <FaTrash className="text-slate-300 size-4" onClick={handleClickOnTrash} />
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar intervención</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Estás seguro que quieres eliminar esta intervención? </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleConfirmDeletion}>
                            Confirmar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </>
    )
}
export default InterventionCard