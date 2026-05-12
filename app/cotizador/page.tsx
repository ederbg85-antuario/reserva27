"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { QuoteProvider, useQuote } from "@/components/cotizador/QuoteContext";
import Stepper, { STEP_KEYS, type StepKey } from "@/components/cotizador/Stepper";
import PriceBar from "@/components/cotizador/PriceBar";
import StepMicheladas from "@/components/cotizador/StepMicheladas";
import StepSabores from "@/components/cotizador/StepSabores";
import StepChile from "@/components/cotizador/StepChile";
import StepCervezas from "@/components/cotizador/StepCervezas";
import StepExtras from "@/components/cotizador/StepExtras";
import StepDatos from "@/components/cotizador/StepDatos";
import StepResumen from "@/components/cotizador/StepResumen";
import Logo from "@/components/Logo";
import { ChevronLeft } from "lucide-react";

export default function CotizadorPage() {
  return (
    <QuoteProvider>
      <CotizadorShell />
    </QuoteProvider>
  );
}

// useLayoutEffect en cliente, useEffect en SSR — evita warning de hydration
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function CotizadorShell() {
  const [step, setStep] = useState<StepKey>("micheladas");
  const { state } = useQuote();

  // Medimos la altura del bloque superior (header + stepper + pricebar)
  // y la replicamos como padding-top en <main>. Así, aunque el bloque sea
  // position:fixed (siempre visible), el contenido nunca queda oculto detrás.
  const topRef = useRef<HTMLDivElement>(null);
  const [topHeight, setTopHeight] = useState(160);

  useIsoLayoutEffect(() => {
    if (!topRef.current) return;
    const el = topRef.current;
    const update = () => setTopHeight(el.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // Scroll al inicio del contenido cada vez que cambia de paso
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  const idx = STEP_KEYS.indexOf(step);
  const goNext = () => setStep(STEP_KEYS[Math.min(STEP_KEYS.length - 1, idx + 1)]);
  const goPrev = () => setStep(STEP_KEYS[Math.max(0, idx - 1)]);

  const canAdvance = useMemo(() => {
    switch (step) {
      case "micheladas":
        return state.totalMicheladas > 0;
      case "sabores": {
        const sum = state.sabores.reduce((a, s) => a + s.cantidad, 0);
        return sum > 0 && sum <= state.totalMicheladas;
      }
      case "chile":
        return !!state.chileId;
      case "cervezas":
      case "extras":
        return true;
      case "datos":
        return (
          !!state.cliente.nombre &&
          !!state.cliente.email &&
          !!state.cliente.telefono &&
          !!state.cliente.fecha &&
          !!state.cliente.tipoEvento
        );
      default:
        return true;
    }
  }, [step, state]);

  return (
    <div className="min-h-[100svh] bg-crema">
      {/* Bloque superior FIJO — header + stepper + barra de precio.
          Siempre visible al usuario sin importar el scroll. */}
      <div
        ref={topRef}
        className="fixed inset-x-0 top-0 z-40 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.18)]"
      >
        <header className="bg-charcoal text-crema">
          <div className="container-page h-[64px] sm:h-[72px] flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center" aria-label="Volver a inicio">
              <Logo variant="inverso" className="h-9 sm:h-10 w-auto" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-crema/80 hover:text-crema"
            >
              <ChevronLeft size={14} /> Salir
            </Link>
          </div>
        </header>
        <Stepper current={step} onJump={(k) => setStep(k)} />
        <PriceBar
          onPrimary={
            step === "resumen"
              ? () => window.scrollTo({ top: 0, behavior: "smooth" })
              : goNext
          }
          onSecondary={goPrev}
          primaryLabel={
            step === "datos"
              ? "Ver cotización"
              : step === "resumen"
              ? "Volver arriba"
              : "Siguiente"
          }
          secondaryLabel="Atrás"
          disablePrimary={!canAdvance}
          hideSecondary={idx === 0}
        />
      </div>

      {/* Contenido — padding-top compensa la altura real del bloque fijo */}
      <main className="pb-16" style={{ paddingTop: topHeight }}>
        {step === "micheladas" && <StepMicheladas />}
        {step === "sabores" && <StepSabores />}
        {step === "chile" && <StepChile />}
        {step === "cervezas" && <StepCervezas />}
        {step === "extras" && <StepExtras />}
        {step === "datos" && <StepDatos />}
        {step === "resumen" && <StepResumen />}
      </main>
    </div>
  );
}
