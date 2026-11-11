import { useState } from "react";
import type { Cita } from "../types";
import {
  crearCita, type NuevaCitaDTO,
} from "../services/citasApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCitaCreada: (nuevaCita: Cita) => void;
}

export function NuevaCitaModal({ isOpen, onClose, onCitaCreada }: Props) {
  const [mascota, setMascota] = useState("");
  const [cliente, setCliente] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [cargando, setCargando] = useState(false);
  const [errorModal, setErrorModal] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorModal("");
    setCargando(true);

    try {
      const citaData: NuevaCitaDTO = {
        mascota,
        cliente,
        servicio,
        fecha,
        hora,
        estado: "solicitada",
      };

      const creada = await crearCita(citaData);
      onCitaCreada(creada);
      setMascota("");
      setCliente("");
      setServicio("");
      setFecha("");
      setHora("");
      onClose();
    } catch (err) {
      setErrorModal(err instanceof Error ? err.message : "Error al guardar la cita.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold text-slate-950">
            Nueva Cita
          </h3>
          <button
            onClick={onClose}
            disabled={cargando}
            className="text-slate-400 hover:text-slate-600 text-2xl font-semibold leading-none"
          >
            &times;
          </button>
        </div>

        {errorModal && (
          <div className="mt-4 rounded-xl bg-red-100 p-3 text-sm text-red-800">
            {errorModal}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Nombre de la Mascota
            </label>
            <input
              type="text"
              required
              value={mascota}
              onChange={(e) => setMascota(e.target.value)}
              placeholder="Ej. Max"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Cliente (Dueño)
            </label>
            <input
              type="text"
              required
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Ej. Ana López"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Servicio
            </label>
            <input
              type="text"
              required
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              placeholder="Ej. Vacunación, Consulta"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Fecha
            </label>
            <input
              type="date"
              required
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Hora
            </label>
            <input
              type="time"
              required
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
          </div>

          <div className="mt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={cargando}
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando}
              className="rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800 disabled:opacity-50 transition-colors"
            >
              {cargando ? "Guardando..." : "Guardar Cita"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}