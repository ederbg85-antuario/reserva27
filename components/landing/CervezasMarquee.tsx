import Image from "next/image";
import { CERVEZAS } from "@/lib/catalog";

/**
 * Carrusel infinito de cervezas. Renderiza la lista dos veces y anima
 * translateX(-50%) en loop para dar la ilusión de marquesina continua.
 * Sin JS — pura animación CSS.
 */
export default function CervezasMarquee() {
  const lista = CERVEZAS;
  return (
    <section
      className="relative bg-crema py-12 sm:py-16 border-y border-charcoal/5 overflow-hidden"
      aria-label="Cervezas que servimos"
    >
      <div className="container-page mb-6 sm:mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Cervezas</p>
          <h2 className="mt-2">Las que sirven en tu evento.</h2>
        </div>
        <p className="text-sm text-charcoal/60 max-w-xs">
          Más de 20 SKUs entre latas, botellas y caguamas. Tú armas el mix.
        </p>
      </div>

      <div className="relative">
        {/* Fades laterales para que el corte se sienta intencional */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-crema to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-crema to-transparent z-10" />

        <div className="flex w-max animate-marquee gap-4 sm:gap-6 will-change-transform">
          {[...lista, ...lista].map((c, i) => (
            <div
              key={`${c.id}-${i}`}
              className="shrink-0 w-[110px] sm:w-[140px] md:w-[160px]"
              aria-hidden={i >= lista.length}
            >
              <div className="relative aspect-square rounded-2xl bg-white border border-charcoal/5 shadow-sm overflow-hidden">
                <Image
                  src={c.imagen}
                  alt={`${c.marca} ${c.variante ?? ""}`}
                  fill
                  sizes="160px"
                  className="object-contain p-3"
                  quality={75}
                />
              </div>
              <p className="mt-2 text-[11px] sm:text-xs text-charcoal/70 text-center uppercase tracking-wide">
                {c.marca}
                {c.variante ? ` · ${c.variante}` : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
