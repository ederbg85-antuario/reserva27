"use client";

import { useQuote } from "./QuoteContext";
import { CHILES } from "@/lib/catalog";
import { Flame, Check } from "lucide-react";

export default function StepChile() {
  const { state, dispatch } = useQuote();

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-4xl">
        <p className="kicker">Escarcha & Clamato</p>
        <h2 className="mt-2 text-charcoal">¿Cómo le gusta a tu gente?</h2>
        <p className="mt-4 text-charcoal/70 text-base sm:text-lg leading-relaxed max-w-xl">
          La escarcha es un detalle del cliente. Si tienes invitados que no
          aguantan picante, podemos preparar la mitad sin chile.
        </p>

        <div className="mt-8 grid gap-3 sm:gap-4 sm:grid-cols-2">
          {CHILES.map((c) => {
            const active = state.chileId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => dispatch({ type: "setChile", value: c.id })}
                aria-pressed={active}
                className={[
                  "text-left card p-5 sm:p-6 transition",
                  active ? "ring-2 ring-brasa shadow-soft" : "hover:shadow-soft",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-charcoal uppercase">
                      {c.nombre}
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-charcoal/65">
                      {c.detalle}
                    </p>
                    {c.costoExtra > 0 ? (
                      <p className="mt-2 text-xs font-semibold uppercase tracking-kicker text-brasa">
                        +${c.costoExtra} por michelada
                      </p>
                    ) : (
                      <p className="mt-2 text-xs font-semibold uppercase tracking-kicker text-charcoal/40">
                        Sin costo extra
                      </p>
                    )}
                  </div>
                  <span
                    className={[
                      "inline-flex h-8 w-8 items-center justify-center rounded-full shrink-0",
                      active
                        ? "bg-brasa text-crema"
                        : "bg-charcoal/[0.06] text-charcoal/40",
                    ].join(" ")}
                  >
                    {active ? <Check size={16} strokeWidth={3} /> : <Flame size={14} />}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-10 card p-5 sm:p-7">
          <div className="flex items-start gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => dispatch({ type: "toggleClamato" })}
              aria-pressed={state.conClamato}
              className={[
                "shrink-0 relative inline-flex h-7 w-12 rounded-full transition",
                state.conClamato ? "bg-brasa" : "bg-charcoal/20",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform",
                  state.conClamato ? "translate-x-6" : "translate-x-1",
                ].join(" ")}
              />
            </button>
            <div>
              <p className="font-display text-xl text-charcoal uppercase">
                Con Clamato
              </p>
              <p className="text-sm sm:text-base text-charcoal/65 mt-1">
                Si está activo, todas las micheladas llevan Clamato.{" "}
                <span className="text-charcoal/85 font-semibold">
                  +$10 por michelada.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
