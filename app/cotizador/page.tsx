"use client";

import { useEffect, useMemo, useState } from "react";
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

function CotizadorShell() {
  const [step, setStep] = useState<StepKey>("micheladas");
  const { state } = useQuote();

  // Scroll al top cuando cambia de paso (mobile UX)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  const idx = STEP_KEYS.indexOf(step);
  const goNext = () => setStep(STEP_KEYS[Math.min(STEP_KEYS.length - 1, idx + 1)]);
  const goPrev = () => setStep(STEP_KEYS[Math.max(0, idx - 1)]);

  // Reglas de validación por paso
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
    <div className="min-h-[100svh] bg-crema flex flex-col">
      {/* Header */}
      <header className="bg-charcoal text-crema sticky top-0 z-40">
        <div className="container-page h-[68px] sm:h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center" aria-label="Volver a inicio">
            <Logo variant="inverso" className="h-10 sm:h-11 w-auto" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-crema/80 hover:text-crema"
          >
            <ChevronLeft size={14} /> Salir
          </Link>
        </div>
      </header>

      {/* Stepper + PriceBar pegados arriba */}
      <div className="sticky top-[68px] sm:top-20 z-30">
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

      {/* Contenido */}
      <main className="flex-1 pb-24">
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
