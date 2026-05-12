"use client";

import { Check } from "lucide-react";

const STEPS = [
  { key: "micheladas", label: "Cantidad" },
  { key: "sabores", label: "Sabores" },
  { key: "chile", label: "Chile" },
  { key: "cervezas", label: "Cervezas" },
  { key: "extras", label: "Extras" },
  { key: "datos", label: "Tus datos" },
  { key: "resumen", label: "Resumen" },
] as const;

export type StepKey = (typeof STEPS)[number]["key"];
export const STEP_KEYS: readonly StepKey[] = STEPS.map((s) => s.key);

export default function Stepper({
  current,
  onJump,
}: {
  current: StepKey;
  onJump?: (k: StepKey) => void;
}) {
  const idx = STEPS.findIndex((s) => s.key === current);
  const pct = ((idx) / (STEPS.length - 1)) * 100;

  return (
    <div className="bg-crema/95 border-b border-charcoal/10 backdrop-blur-md">
      <div className="container-page py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3">
          <p className="kicker text-charcoal/60">
            Paso {idx + 1} de {STEPS.length}
          </p>
          <p className="font-display uppercase text-charcoal text-lg sm:text-xl tracking-tight">
            {STEPS[idx].label}
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="relative h-1.5 w-full rounded-full bg-charcoal/10 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-brasa transition-[width] duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Chips desktop */}
        <ol className="mt-3 hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar">
          {STEPS.map((s, i) => {
            const done = i < idx;
            const active = i === idx;
            return (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => done && onJump?.(s.key)}
                  className={[
                    "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-kicker transition",
                    active
                      ? "bg-charcoal text-crema"
                      : done
                      ? "bg-champagne/30 text-charcoal hover:bg-champagne/50"
                      : "bg-transparent text-charcoal/40",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px]",
                      active
                        ? "bg-brasa text-crema"
                        : done
                        ? "bg-champagne text-charcoal"
                        : "bg-charcoal/15 text-charcoal/60",
                    ].join(" ")}
                  >
                    {done ? <Check size={11} strokeWidth={3} /> : i + 1}
                  </span>
                  {s.label}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
