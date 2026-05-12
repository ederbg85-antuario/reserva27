"use client";

import { useState } from "react";
import { useQuote } from "./QuoteContext";
import { formatMXN } from "@/lib/pricing";
import { ChevronDown, ArrowRight } from "lucide-react";

/**
 * Barra de cotización en vivo. Se monta debajo del Stepper como sticky bar
 * superior — visible en todo momento, no la tapa el botón flotante de WhatsApp.
 */
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
    <div className="bg-charcoal text-crema border-y border-crema/10 shadow-[0_8px_22px_-12px_rgba(0,0,0,0.4)]">
      <div className="container-page py-3 sm:py-3.5">
        <div className="flex items-center gap-3">
          {/* Total + meta */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex items-center gap-3 flex-1 min-w-0 text-left"
          >
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-kicker font-semibold text-champagne">
                Total en vivo
              </p>
              <p className="font-semibold text-xl sm:text-2xl text-crema leading-none mt-1 tabular-nums">
                {formatMXN(quote.total)}
              </p>
              <p className="hidden sm:block text-[11px] text-crema/55 mt-1">
                {state.totalMicheladas} micheladas · {state.cervezas.reduce((a, c) => a + c.cantidad, 0)} cervezas
              </p>
            </div>
            <span
              className={`ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-crema/10 transition-transform ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden
            >
              <ChevronDown size={14} />
            </span>
          </button>

          {/* Acciones */}
          <div className="flex items-center gap-2 shrink-0">
            {!hideSecondary && (
              <button
                type="button"
                onClick={onSecondary}
                className="hidden sm:inline-flex h-11 px-4 rounded-full bg-crema/10 hover:bg-crema/15 text-crema text-xs font-semibold uppercase tracking-kicker"
              >
                {secondaryLabel}
              </button>
            )}
            <button
              type="button"
              onClick={onPrimary}
              disabled={disablePrimary}
              className="inline-flex items-center gap-2 h-11 px-4 sm:px-5 rounded-full bg-brasa text-crema text-xs sm:text-sm font-semibold uppercase tracking-kicker shadow-brasa hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {primaryLabel}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Detalle colapsable */}
        <div
          className={`grid transition-all duration-300 ease-out ${
            open ? "grid-rows-[1fr] mt-3 opacity-100" : "grid-rows-[0fr] mt-0 opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="max-h-[42vh] overflow-y-auto pr-1 space-y-2 text-sm border-t border-crema/10 pt-3">
              {quote.lineas.map((l, i) => (
                <li key={i} className="flex justify-between gap-4 border-b border-crema/5 pb-2">
                  <span className="text-crema/80 leading-snug">
                    {l.concepto}
                    {l.detalle ? (
                      <span className="block text-crema/45 text-[11px]">{l.detalle}</span>
                    ) : null}
                  </span>
                  <span className="font-semibold tabular-nums whitespace-nowrap">
                    {formatMXN(l.importe)}
                  </span>
                </li>
              ))}
            </ul>
            {!hideSecondary && (
              <button
                type="button"
                onClick={onSecondary}
                className="sm:hidden mt-3 text-xs font-semibold uppercase tracking-kicker text-crema/70 underline underline-offset-4"
              >
                ← {secondaryLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
