"use client";

import { useQuote } from "./QuoteContext";
import { EXTRAS } from "@/lib/catalog";
import { formatMXN } from "@/lib/pricing";
import QtyControl from "./QtyControl";

export default function StepExtras() {
  const { state, dispatch } = useQuote();

  function qtyOf(id: string) {
    return state.extras.find((e) => e.extra.id === id)?.cantidad ?? 0;
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-4xl">
        <p className="kicker">Extras (opcionales)</p>
        <h2 className="mt-2 text-charcoal">Para subir un poquito el evento.</h2>
        <p className="mt-4 text-charcoal/70 text-base sm:text-lg leading-relaxed max-w-xl">
          Ninguno es obligatorio. Si tu evento es grande o largo, suelen valer
          la pena.
        </p>

        <div className="mt-8 grid gap-3 sm:gap-4">
          {EXTRAS.map((e) => {
            const q = qtyOf(e.id);
            const active = q > 0;
            const factor =
              e.unidad === "hora" ? Math.max(0, state.horasEvento - 4) : 1;
            return (
              <article
                key={e.id}
                className={[
                  "card p-4 sm:p-5 flex items-center gap-4 transition",
                  active ? "ring-2 ring-brasa/70 shadow-soft" : "",
                ].join(" ")}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold tracking-tight text-charcoal">
                    {e.nombre}
                  </h3>
                  <p className="text-sm text-charcoal/65 mt-0.5">{e.detalle}</p>
                  <p className="mt-2 text-sm font-semibold text-charcoal tabular-nums">
                    {formatMXN(e.precio)}{" "}
                    <span className="text-charcoal/50 font-normal">
                      {e.unidad === "hora" ? "/ hora extra" : "/ unidad"}
                    </span>
                  </p>
                  {e.unidad === "hora" && factor === 0 && (
                    <p className="text-xs text-charcoal/45 mt-1">
                      Aplica solo si extiendes el evento más de 4 horas.
                    </p>
                  )}
                </div>
                <QtyControl
                  value={q}
                  onChange={(n) =>
                    dispatch({ type: "setExtraQty", extra: e, cantidad: n })
                  }
                  max={10}
                  size="sm"
                  ariaLabel={e.nombre}
                />
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
