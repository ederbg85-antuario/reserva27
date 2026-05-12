import Image from "next/image";

const PILARES = [
  {
    n: "01",
    title: "Sabor",
    body: "Mexicano, con carácter.",
  },
  {
    n: "02",
    title: "Servicio",
    body: "Atento, sin protocolos.",
  },
  {
    n: "03",
    title: "Experiencia",
    body: "Algo que la gente cuenta.",
  },
];

export default function Nosotros() {
  return (
    <section id="nosotros" className="bg-crema py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 md:gap-16 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="/images/baristas-trabajando.jpg"
                alt="Baristas Reserva 27 en evento"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
                quality={85}
              />
            </div>
            <div className="absolute -bottom-6 -right-3 sm:-right-6 hidden sm:block">
              <div className="bg-charcoal text-crema rounded-2xl px-5 py-4 shadow-soft max-w-[220px]">
                <p className="kicker text-champagne">Cobertura</p>
                <p className="mt-1 text-sm leading-snug">
                  CDMX y zona metropolitana, montaje incluido.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="eyebrow">Quiénes somos</p>
            <h2 className="mt-3 max-w-xl">
              Una barra móvil de micheladas, hecha para tus mejores noches.
            </h2>
            <p className="mt-6 max-w-lg text-charcoal/75 text-base sm:text-[17px] leading-relaxed">
              Llegamos con la barra, las cervezas y un equipo que sabe lo que
              hace. Tú disfrutas el evento; nosotros nos encargamos de que cada
              vaso salga como debe.
            </p>

            <ul className="mt-10 grid sm:grid-cols-3 gap-5 sm:gap-3">
              {PILARES.map((p) => (
                <li key={p.n} className="border-t border-charcoal/15 pt-4">
                  <p className="text-xs font-medium text-champagne-600 tracking-widest">
                    {p.n}
                  </p>
                  <h3 className="mt-2">{p.title}</h3>
                  <p className="mt-1 text-sm text-charcoal/70 leading-relaxed">
                    {p.body}
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
