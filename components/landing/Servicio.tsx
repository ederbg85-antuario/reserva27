import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

const FEATURES = [
  "Barra propia, equipo uniformado y vajilla incluida.",
  "Cervezas, chamoy, salsas, especias y todos los insumos.",
  "Baristas capacitados para atender con buena onda.",
  "Operación llave en mano: montaje, servicio y limpieza.",
];

export default function Servicio() {
  return (
    <section id="servicio" className="bg-charcoal text-crema py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] overflow-hidden rounded-3xl">
          <Image
            src="/images/barra-llena.jpg"
            alt="Barra Reserva 27 con cervezas y mise en place"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/40 to-transparent" />
          <div className="absolute left-5 bottom-5 right-5 flex items-center gap-3 text-xs uppercase tracking-kicker">
            <span className="h-px flex-1 bg-champagne/60" />
            <span className="text-champagne">Llave en mano</span>
            <span className="h-px flex-1 bg-champagne/60" />
          </div>
        </div>

        <div>
          <p className="kicker text-champagne">Propuesta de valor</p>
          <h2 className="mt-3">
            Barra completa,
            <br />
            <span className="text-champagne">lista en menos de una hora.</span>
          </h2>
          <p className="mt-6 text-crema/80 text-base sm:text-lg leading-relaxed max-w-xl">
            Llegamos con todo y nos vamos sin dejar rastro. Tú disfrutas tu evento;
            nosotros nos encargamos de que cada vaso salga como debe.
          </p>

          <ul className="mt-8 grid gap-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex gap-3 items-start">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-champagne text-charcoal">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-crema/85 leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link href="/cotizador" className="btn-primary">
              Cotiza tu evento
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
