"use client";

import { useState } from "react";
import { useQuote } from "./QuoteContext";
import { formatMXN } from "@/lib/pricing";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function PriceBar({
  onPrimary,
  onSecondary,
  primaryLabel = "Siguiente",
  secondaryLabel = "Atrás",
  disablePrimary,
  hideSecondary,
}: {
  onPrimary?: () => void;
  onSecondary?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  disablePrimary?: boolean;
  hideSecondary?: boolean;
}) {
  const { quote, state } = useQuote();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30">
      <div
        className={[
          "bg-charcoal text-crema border-t border-crema/10 transition-all",
          "shadow-[0_-14px_30px_-10px_rgba(0,0,0,0.35)]",
        ].join(" ")}
      >
        {/* Detalle colapsable */}
        <div
          className={[
            "container-page overflow-hidden transition-all",
            open ? "max-h-[60vh] py-5" : "max-h-0 py-0",
          ].join(" ")}
        >
          <p className="kicker text-champagne mb-3">Desglose en vivo</p>
          <ul className="space-y-2 max-h-[40vh] overflow-y-auto pr-1 text-sm">
            {quote.lineas.map((l, i) => (
              <li key={i} className="flex justify-between gap-4 border-b border-crema/10 pb-2">
                <span className="text-crema/80 leading-snug">
                  {l.concepto}
                  {l.detalle ? <span className="block text-crema/50 text-xs">{l.detalle}</span> : null}
                </span>
                <span className="font-semibold tabular-nums">{formatMXN(l.importe)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="container-page py-3 sm:py-4 safe-bottom flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 flex-1 min-w-0 text-left"
            aria-expanded={open}
          >
            <div className="min-w-0">
              <p className="kicker text-champagne">
                {state.totalMicheladas} micheladas · {state.cervezas.reduce((a, c) => a + c.cantidad, 0)} cervezas
              </p>
              <p className="font-display text-2xl sm:text-3xl text-crema leading-none mt-1 tabular-nums">
                {formatMXN(quote.total)}
              </p>
            </div>
            <span className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-crema/10">
              {open ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </span>
          </button>

          <div className="flex items-center gap-2 shrink-0">
            {!hideSecondary && (
              <button
                type="button"
                onClick={onSecondary}
                className="hidden sm:inline-flex btn-on-dark"
              >
                {secondaryLabel}
              </button>
            )}
            <button
              type="button"
              onClick={onPrimary}
              disabled={disablePrimary}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {primaryLabel}
            </button>
          </div>
        </div>

        {!hideSecondary && (
          <div className="sm:hidden container-page pb-3 -mt-1">
            <button
              type="button"
              onClick={onSecondary}
              className="text-xs font-semibold uppercase tracking-kicker text-crema/70 underline-offset-4 underline"
            >
              {secondaryLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
