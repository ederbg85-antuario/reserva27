"use client";

import { useQuote } from "./QuoteContext";
import { SABORES } from "@/lib/catalog";
import { Flame } from "lucide-react";

export default function StepSabores() {
  const { state, dispatch } = useQuote();
  const totalAsignado = state.sabores.reduce((a, s) => a + s.cantidad, 0);
  const restantes = state.totalMicheladas - totalAsignado;

  function setQty(s: { id: string; nombre: string }, cantidad: number) {
    dispatch({ type: "setSaborQty", id: s.id, nombre: s.nombre, cantidad: Math.max(0, cantidad) });
  }

  function distribuirEquitativo() {
    const seleccionadas = state.sabores.filter((s) => s.cantidad > 0);
    const ids = seleccionadas.length > 0 ? seleccionadas.map((s) => s.id) : SABORES.slice(0, 3).map((s) => s.id);
    const por = Math.floor(state.totalMicheladas / ids.length);
    const sobra = state.totalMicheladas - por * ids.length;
    ids.forEach((id, i) => {
      const s = SABORES.find((x) => x.id === id)!;
      dispatch({
        type: "setSaborQty",
        id: s.id,
        nombre: s.nombre,
        cantidad: por + (i === 0 ? sobra : 0),
      });
    });
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-5xl">
        <p className="kicker">Sabores</p>
        <h2 className="mt-2 text-charcoal">Elige los sabores de tu evento.</h2>
        <p className="mt-4 text-charcoal/70 text-base sm:text-lg leading-relaxed max-w-xl">
          Puedes mezclar varios. Te sugerimos 2 o 3 sabores para que sea variado sin
          marear al equipo de barra.
        </p>

        <div className="mt-6 sticky top-[112px] sm:top-[124px] z-20 -mx-5 sm:mx-0 px-5 sm:px-0">
          <div className="card flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <div>
              <p className="kicker text-charcoal/60">Asignadas</p>
              <p className="font-display text-2xl text-charcoal tabular-nums leading-none mt-1">
                {totalAsignado} / {state.totalMicheladas}
              </p>
            </div>
            <button
              onClick={distribuirEquitativo}
              type="button"
              className="rounded-full bg-champagne/40 hover:bg-champagne/60 text-charcoal text-xs font-bold uppercase tracking-kicker px-4 h-10"
            >
              Distribuir equitativo
            </button>
          </div>
          {restantes !== 0 && (
            <p
              className={`mt-2 text-xs sm:text-sm font-medium ${
                restantes > 0 ? "text-brasa" : "text-red-600"
              }`}
            >
              {restantes > 0
                ? `Faltan ${restantes} por asignar.`
                : `Te pasaste por ${-restantes}. Ajusta abajo.`}
            </p>
          )}
        </div>

        <div className="mt-8 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SABORES.map((s) => {
            const qty = state.sabores.find((x) => x.id === s.id)?.cantidad ?? 0;
            return (
              <article
                key={s.id}
                className={[
                  "card p-4 sm:p-5 transition",
                  qty > 0 ? "ring-2 ring-brasa/60 shadow-soft" : "",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl text-charcoal uppercase leading-snug">
                      {s.nombre}
                    </h3>
                    <p className="mt-1 text-sm text-charcoal/65 leading-snug">{s.descripcion}</p>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    {Array.from({ length: s.picante }).map((_, i) => (
                      <Flame key={i} size={14} className="text-brasa" />
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={qty || ""}
                    placeholder="0"
                    onChange={(e) =>
                      setQty(s, parseInt(e.target.value || "0", 10))
                    }
                    aria-label={`Cantidad de ${s.nombre}`}
                    className="h-11 w-20 rounded-xl border border-charcoal/15 bg-white px-3 text-center text-lg font-semibold focus:border-brasa focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQty(s, qty + 10)}
                    className="text-xs font-semibold uppercase tracking-kicker text-charcoal/70 hover:text-charcoal"
                  >
                    +10
                  </button>
                  <button
                    type="button"
                    onClick={() => setQty(s, qty + 25)}
                    className="text-xs font-semibold uppercase tracking-kicker text-charcoal/70 hover:text-charcoal"
                  >
                    +25
                  </button>
                  {qty > 0 && (
                    <button
                      type="button"
                      onClick={() => setQty(s, 0)}
                      className="ml-auto text-xs font-semibold uppercase tracking-kicker text-brasa"
                    >
                      Quitar
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
