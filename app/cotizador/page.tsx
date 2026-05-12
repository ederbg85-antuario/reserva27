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
  const goNext = () => {
    const n = STEP_KEYS[Math.min(STEP_KEYS.length - 1, idx + 1)];
    setStep(n);
  };
  const goPrev = () => {
    const p = STEP_KEYS[Math.max(0, idx - 1)];
    setStep(p);
  };

  // Reglas de validación por paso para habilitar el botón "Siguiente"
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
        return true; // las cervezas son opcionales
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
      {/* Header simple del cotizador */}
      <header className="bg-charcoal text-crema sticky top-0 z-30">
        <div className="container-page h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center" aria-label="Volver a inicio">
            <Logo variant="inverso" className="h-7 sm:h-8 w-auto" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold uppercase tracking-kicker text-crema/80 hover:text-crema"
          >
            <ChevronLeft size={14} /> Salir
          </Link>
        </div>
      </header>

      {/* Stepper */}
      <div className="sticky top-16 sm:top-20 z-20">
        <Stepper current={step} onJump={(k) => setStep(k)} />
      </div>

      {/* Contenido paso a paso */}
      <main className="flex-1 pb-28 sm:pb-32">
        {step === "micheladas" && <StepMicheladas />}
        {step === "sabores" && <StepSabores />}
        {step === "chile" && <StepChile />}
        {step === "cervezas" && <StepCervezas />}
        {step === "extras" && <StepExtras />}
        {step === "datos" && <StepDatos />}
        {step === "resumen" && <StepResumen />}
      </main>

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
            ? "Listo"
            : "Siguiente"
        }
        secondaryLabel="Atrás"
        disablePrimary={!canAdvance}
        hideSecondary={idx === 0}
      />
    </div>
  );
}
