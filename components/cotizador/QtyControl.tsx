"use client";

import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md";
  ariaLabel?: string;
};

export default function QtyControl({
  value,
  onChange,
  min = 0,
  max = 9999,
  step = 1,
  size = "md",
  ariaLabel,
}: Props) {
  const btn =
    size === "sm"
      ? "h-9 w-9 sm:h-10 sm:w-10"
      : "h-11 w-11 sm:h-12 sm:w-12";
  const txt = size === "sm" ? "w-10 text-base" : "w-12 text-lg";
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-charcoal/[0.04] p-1">
      <button
        type="button"
        aria-label={`Disminuir ${ariaLabel ?? ""}`}
        onClick={dec}
        disabled={value <= min}
        className={`${btn} rounded-full bg-white text-charcoal shadow-sm border border-charcoal/10 disabled:opacity-40 active:scale-95 transition`}
      >
        <Minus size={16} className="mx-auto" />
      </button>
      <span
        aria-live="polite"
        className={`${txt} text-center font-display text-charcoal`}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label={`Aumentar ${ariaLabel ?? ""}`}
        onClick={inc}
        disabled={value >= max}
        className={`${btn} rounded-full bg-charcoal text-crema active:scale-95 transition disabled:opacity-40`}
      >
        <Plus size={16} className="mx-auto" />
      </button>
    </div>
  );
}
