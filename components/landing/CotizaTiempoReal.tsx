import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const PASOS = [
  { n: "01", t: "Eliges cuántas micheladas." },
  { n: "02", t: "Mezclas sabores y cervezas." },
  { n: "03", t: "Recibes tu cotización en PDF." },
];

export default function CotizaTiempoReal() {
  return (
    <section
      id="cotiza"
      className="relative overflow-hidden bg-charcoal text-crema"
    >
      {/* Patrón sutil de fondo */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(215,178,139,0.45) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative container-page py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow text-champagne">Sin sorpresas</p>
            <h2 className="mt-3 max-w-xl text-crema">
              Cotiza tu paquete <span className="text-champagne">en tiempo real.</span>
            </h2>
            <p className="mt-6 max-w-lg text-crema/80 text-base sm:text-[17px] leading-relaxed">
              Eliges las micheladas, los sabores y las cervezas. El precio se
              ajusta delante de ti — transparente, paso a paso. Al final
              descargas tu cotización en PDF.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/cotizador" className="btn-primary group">
                Cotizar mi paquete
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href="https://wa.me/525538792176?text=Hola%20Reserva%2027%2C%20me%20gustar%C3%ADa%20cotizar%20un%20evento."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-on-dark"
              >
                Prefiero por WhatsApp
              </a>
            </div>
          </div>

          {/* Tarjeta visual: simula el cotizador en vivo */}
          <div className="relative">
            <div
              className="absolute -inset-4 sm:-inset-6 rounded-[28px] bg-champagne/10 blur-xl opacity-80"
              aria-hidden
            />
            <div className="relative rounded-3xl bg-crema text-charcoal p-6 sm:p-8 shadow-glow">
              <div className="flex items-center justify-between">
                <p className="kicker text-charcoal/70">Tu cotización en vivo</p>
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-kicker font-semibold text-brasa">
                  <Sparkles size={12} /> En vivo
                </span>
              </div>

              <ul className="mt-6 divide-y divide-charcoal/10 text-sm">
                <li className="flex justify-between py-2.5">
                  <span className="text-charcoal/70">120 micheladas</span>
                  <span className="font-semibold tabular-nums">$10,200</span>
                </li>
                <li className="flex justify-between py-2.5">
                  <span className="text-charcoal/70">Con Clamato</span>
                  <span className="font-semibold tabular-nums">$1,200</span>
                </li>
                <li className="flex justify-between py-2.5">
                  <span className="text-charcoal/70">60 cervezas</span>
                  <span className="font-semibold tabular-nums">$2,700</span>
                </li>
                <li className="flex justify-between py-2.5">
                  <span className="text-charcoal/70">Servicio (30%)</span>
                  <span className="font-semibold tabular-nums">$3,420</span>
                </li>
                <li className="flex justify-between py-2.5">
                  <span className="text-charcoal/70">2 baristas · 4h</span>
                  <span className="font-semibold tabular-nums">$1,500</span>
                </li>
              </ul>

              <div className="mt-5 pt-5 border-t border-charcoal/10 flex items-end justify-between">
                <p className="kicker text-charcoal/70">Total estimado</p>
                <p className="text-3xl font-semibold tabular-nums text-charcoal">
                  $19,020
                </p>
              </div>

              <p className="mt-5 text-xs text-charcoal/55">
                Datos de ejemplo. Tu paquete real se ajusta en tiempo real según
                tus elecciones.
              </p>
            </div>

            <ul className="mt-8 grid grid-cols-3 gap-3 text-center">
              {PASOS.map((p) => (
                <li key={p.n}>
                  <p className="text-champagne text-[11px] tracking-widest font-semibold">
                    {p.n}
                  </p>
                  <p className="mt-1 text-xs sm:text-[13px] text-crema/85 leading-snug">
                    {p.t}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
