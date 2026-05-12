"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useQuote } from "./QuoteContext";
import { CERVEZAS, type Cerveza } from "@/lib/catalog";
import { formatMXN } from "@/lib/pricing";
import QtyControl from "./QtyControl";

type Tab = "lata" | "botella" | "caguama";
const TABS: { id: Tab; label: string }[] = [
  { id: "lata", label: "Latas" },
  { id: "botella", label: "Botellas" },
  { id: "caguama", label: "Caguamas" },
];

export default function StepCervezas() {
  const { state, dispatch } = useQuote();
  const [tab, setTab] = useState<Tab>("lata");

  const total = state.cervezas.reduce((a, c) => a + c.cantidad, 0);
  const totalImporte = state.cervezas.reduce((a, c) => a + c.cantidad * c.cerveza.precio, 0);

  const items = useMemo(() => CERVEZAS.filter((c) => c.formato === tab), [tab]);

  function qtyOf(c: Cerveza) {
    return state.cervezas.find((x) => x.cerveza.id === c.id)?.cantidad ?? 0;
  }
  function set(c: Cerveza, n: number) {
    dispatch({ type: "setCervezaQty", cerveza: c, cantidad: Math.max(0, n) });
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-6xl">
        <p className="kicker">Cervezas</p>
        <h2 className="mt-2 text-charcoal">Arma tu mix.</h2>
        <p className="mt-4 text-charcoal/70 text-base sm:text-lg leading-relaxed max-w-xl">
          Estima entre 2 y 3 cervezas por invitado para 4 horas de evento. Si
          dudas, te ayudamos por WhatsApp.
        </p>

        <div className="mt-6 sticky top-[112px] sm:top-[124px] z-20 -mx-5 sm:mx-0 px-5 sm:px-0">
          <div className="card flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <div>
              <p className="kicker text-charcoal/60">En el carrito</p>
              <p className="font-display text-2xl text-charcoal tabular-nums leading-none mt-1">
                {total} cervezas
              </p>
            </div>
            <p className="font-display text-xl tabular-nums text-charcoal">
              {formatMXN(totalImporte)}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={[
                "h-11 px-5 rounded-full text-sm font-semibold uppercase tracking-kicker whitespace-nowrap transition",
                tab === t.id
                  ? "bg-charcoal text-crema"
                  : "bg-champagne/30 text-charcoal hover:bg-champagne/50",
              ].join(" ")}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((c) => {
            const q = qtyOf(c);
            const active = q > 0;
            return (
              <article
                key={c.id}
                className={[
                  "card overflow-hidden flex flex-col transition",
                  active ? "ring-2 ring-brasa/70 shadow-soft" : "",
                ].join(" ")}
              >
                <div className="relative aspect-square bg-champagne-50">
                  <Image
                    src={c.imagen}
                    alt={`${c.marca} ${c.variante ?? ""}`}
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
                    className="object-contain p-2 sm:p-3"
                    quality={80}
                  />
                  {active && (
                    <span className="absolute top-2 right-2 inline-flex h-7 min-w-7 px-2 items-center justify-center rounded-full bg-brasa text-crema text-xs font-bold tabular-nums">
                      {q}
                    </span>
                  )}
                </div>
                <div className="p-3 sm:p-4 flex-1 flex flex-col">
                  <p className="text-sm sm:text-[15px] font-semibold tracking-tight text-charcoal leading-tight">
                    {c.marca}
                    {c.variante ? <span className="font-normal text-charcoal/60"> · {c.variante}</span> : null}
                  </p>
                  <p className="text-xs text-charcoal/55 mt-1">{c.ml} ml</p>
                  <p className="mt-2 font-semibold text-charcoal tabular-nums">
                    {formatMXN(c.precio)}
                  </p>
                  <div className="mt-3">
                    <QtyControl
                      value={q}
                      onChange={(n) => set(c, n)}
                      size="sm"
                      max={500}
                      ariaLabel={`${c.marca} ${c.variante ?? ""}`}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
