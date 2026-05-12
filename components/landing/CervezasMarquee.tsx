import Image from "next/image";
import { CERVEZAS } from "@/lib/catalog";

/**
 * Carrusel infinito de cervezas. Renderiza la lista dos veces y anima
 * translateX(-50%) en loop para dar la ilusión de marquesina continua.
 *
 * Estética: las fotos vienen con fondo claro de madera. Usamos
 * `mix-blend-multiply` para fundir ese fondo con el crema de la sección,
 * y aplicamos `drop-shadow` directamente sobre el contorno de la
 * cerveza (no sobre el rectángulo) para una sensación de producto premium.
 */
export default function CervezasMarquee() {
  const lista = CERVEZAS;
  return (
    <section
      className="relative bg-crema py-14 sm:py-20 border-y border-charcoal/5 overflow-hidden"
      aria-label="Cervezas que servimos"
    >
      <div className="container-page mb-8 sm:mb-10 flex flex-wrap items-end justify-between gap-3">
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
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-crema to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-crema to-transparent z-10" />

        <div className="flex w-max animate-marquee gap-6 sm:gap-10 will-change-transform py-2">
          {[...lista, ...lista].map((c, i) => (
            <div
              key={`${c.id}-${i}`}
              className="shrink-0 w-[120px] sm:w-[160px] md:w-[180px] flex flex-col items-center"
              aria-hidden={i >= lista.length}
            >
              <div className="relative aspect-square w-full rounded-lg overflow-hidden">
                <Image
                  src={c.imagen}
                  alt={`${c.marca} ${c.variante ?? ""}`}
                  fill
                  sizes="180px"
                  quality={80}
                  className="
                    object-contain
                    mix-blend-multiply
                    [filter:drop-shadow(0_18px_22px_rgba(31,31,31,0.22))_drop-shadow(0_4px_8px_rgba(31,31,31,0.12))]
                    transition-transform duration-500 hover:scale-[1.04]
                  "
                />
              </div>
              <p className="mt-3 text-[11.5px] sm:text-xs font-medium tracking-wide text-charcoal/70 text-center">
                {c.marca}
                {c.variante ? (
                  <span className="text-charcoal/40"> · {c.variante}</span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
