"use client";

import { useQuote } from "./QuoteContext";
import QtyControl from "./QtyControl";

const PRESETS = [30, 50, 80, 120, 200];

export default function StepMicheladas() {
  const { state, dispatch } = useQuote();

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-3xl">
        <p className="kicker">Empezamos por aquí</p>
        <h2 className="mt-2 text-charcoal">¿Cuántas micheladas necesitas?</h2>
        <p className="mt-4 text-charcoal/70 text-base sm:text-lg leading-relaxed max-w-xl">
          Sugerimos entre 2 y 3 micheladas por invitado dependiendo de la duración
          del evento. Puedes ajustar después.
        </p>

        <div className="mt-8 sm:mt-10 card p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div>
              <p className="kicker">Cantidad</p>
              <p className="font-display uppercase text-4xl sm:text-5xl mt-1 text-charcoal tabular-nums">
                {state.totalMicheladas}
              </p>
            </div>
            <div className="ml-auto">
              <QtyControl
                value={state.totalMicheladas}
                onChange={(v) => dispatch({ type: "setMicheladas", value: v })}
                step={5}
                max={2000}
                ariaLabel="cantidad de micheladas"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="kicker block mb-2 text-charcoal/70" htmlFor="m-input">
              Escríbelo directo
            </label>
            <input
              id="m-input"
              inputMode="numeric"
              pattern="[0-9]*"
              value={state.totalMicheladas}
              onChange={(e) =>
                dispatch({
                  type: "setMicheladas",
                  value: parseInt(e.target.value || "0", 10),
                })
              }
              className="w-full sm:w-44 h-12 rounded-xl border border-charcoal/15 bg-white px-4 text-lg font-semibold focus:border-brasa focus:outline-none"
            />
          </div>

          <div className="mt-6">
            <p className="kicker text-charcoal/70 mb-2">Sugerencias rápidas</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => dispatch({ type: "setMicheladas", value: n })}
                  className={[
                    "h-10 px-4 rounded-full text-sm font-semibold transition",
                    state.totalMicheladas === n
                      ? "bg-charcoal text-crema"
                      : "bg-champagne/30 text-charcoal hover:bg-champagne/50",
                  ].join(" ")}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 card p-5 sm:p-7">
          <p className="kicker">Duración del evento</p>
          <p className="mt-1 text-charcoal/75">
            Servicio base 4 horas. Cada hora extra se cobra aparte si la necesitas.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[4, 5, 6, 7, 8].map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => dispatch({ type: "setHoras", value: h })}
                className={[
                  "h-11 px-5 rounded-full text-sm font-semibold transition",
                  state.horasEvento === h
                    ? "bg-charcoal text-crema"
                    : "bg-champagne/30 text-charcoal hover:bg-champagne/50",
                ].join(" ")}
              >
                {h} h
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
