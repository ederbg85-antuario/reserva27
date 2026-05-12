export default function Manifiesto() {
  const creencias = [
    "que una buena michelada empieza desde la primera sonrisa, no desde el primer trago.",
    "que un evento se eleva cuando hay una barra que se siente como parte del lugar.",
    "que el servicio bien hecho no se nota, pero se recuerda toda la noche.",
    "en lo mexicano, en lo bien preparado, y en hacer las cosas con orgullo.",
  ];

  return (
    <section id="nosotros" className="relative bg-crema py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="kicker">Manifiesto · Lo que creemos</p>
          <h2 className="mt-3 text-charcoal">
            La michelada como debe ser:
            <span className="text-brasa"> bien servida y a tiempo.</span>
          </h2>
        </div>

        <ul className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 sm:grid-cols-2">
          {creencias.map((c, i) => (
            <li
              key={i}
              className="bracket text-charcoal/85 p-6 sm:p-8 bg-white/60 rounded-2xl"
            >
              <span className="font-display text-2xl text-brasa block mb-2">
                Creemos
              </span>
              <p className="text-base sm:text-lg leading-relaxed">{c}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
