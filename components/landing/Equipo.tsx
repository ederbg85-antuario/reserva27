import Image from "next/image";

const ITEMS = [
  {
    title: "La barra Reserva 27",
    body:
      "Pieza propia, blanca y compacta. Logo en naranja brasa, ruedas, depósitos para mise en place.",
    image: "/images/barra-blanca.jpg",
  },
  {
    title: "Vaso PET con sello",
    body:
      "Vaso transparente 16 oz con sticker Reserva 27. Premium incluso en plástico.",
    image: "/images/vaso-mostrador.jpg",
  },
  {
    title: "Equipo uniformado",
    body:
      "Mandil negro con logo blanco y tirantes camel. Dos baristas como mínimo.",
    image: "/images/mandil.jpg",
  },
  {
    title: "Cervezas frías",
    body:
      "Más de 20 SKUs entre latas, botellas y caguamas. Cargamos lo necesario para que no falte.",
    image: "/images/cervezas-vicky-tecate.jpg",
  },
];

export default function Equipo() {
  return (
    <section id="equipo" className="bg-crema py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">Lo que llevamos</p>
          <h2 className="mt-3">
            Llegamos con todo. <span className="text-charcoal/55">Tú con cero pendientes.</span>
          </h2>
          <p className="mt-5 text-charcoal/70 text-base sm:text-[17px] leading-relaxed">
            Barra, vajilla, insumos, cervezas y equipo. Montamos, servimos y al
            final lo dejamos como lo encontramos.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it, i) => (
            <article
              key={it.title}
              className="group relative overflow-hidden rounded-3xl bg-white border border-charcoal/5 shadow-card transition hover:shadow-soft"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={it.image}
                  alt={it.title}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
                <span className="absolute top-4 left-4 text-[11px] tracking-widest font-semibold text-champagne">
                  0{i + 1}
                </span>
                <div className="absolute left-5 right-5 bottom-5 text-crema">
                  <h3 className="text-crema">{it.title}</h3>
                  <p className="mt-1.5 text-sm text-crema/80 leading-snug">
                    {it.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
