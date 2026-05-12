"use client";

import { useQuote } from "./QuoteContext";
import { TIPOS_EVENTO } from "@/lib/catalog";

export default function StepDatos() {
  const { state, dispatch } = useQuote();
  const c = state.cliente;
  const set = (patch: Partial<typeof c>) => dispatch({ type: "setCliente", patch });

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-3xl">
        <p className="kicker">Tus datos</p>
        <h2 className="mt-2 text-charcoal">Cuéntanos del evento.</h2>
        <p className="mt-4 text-charcoal/70 text-base sm:text-lg leading-relaxed max-w-xl">
          Con esto preparamos la cotización formal y reservamos tu fecha si lo
          confirmas.
        </p>

        <form className="mt-8 grid gap-4 sm:grid-cols-2" autoComplete="on">
          <Field label="Nombre completo" required>
            <input
              type="text"
              autoComplete="name"
              value={c.nombre}
              onChange={(e) => set({ nombre: e.target.value })}
              className="input"
              required
            />
          </Field>
          <Field label="Tipo de evento" required>
            <select
              value={c.tipoEvento}
              onChange={(e) => set({ tipoEvento: e.target.value })}
              className="input"
              required
            >
              <option value="">Selecciona…</option>
              {TIPOS_EVENTO.map((t) => (
                <option key={t.id} value={t.nombre}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Correo" required>
            <input
              type="email"
              autoComplete="email"
              value={c.email}
              onChange={(e) => set({ email: e.target.value })}
              className="input"
              required
            />
          </Field>
          <Field label="Teléfono / WhatsApp" required>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={c.telefono}
              onChange={(e) => set({ telefono: e.target.value })}
              className="input"
              required
            />
          </Field>

          <Field label="Fecha del evento" required>
            <input
              type="date"
              value={c.fecha}
              onChange={(e) => set({ fecha: e.target.value })}
              className="input"
              required
            />
          </Field>
          <Field label="Hora de inicio">
            <input
              type="time"
              value={c.hora}
              onChange={(e) => set({ hora: e.target.value })}
              className="input"
            />
          </Field>

          <Field label="Invitados aproximados">
            <input
              type="number"
              inputMode="numeric"
              value={c.invitados}
              onChange={(e) => set({ invitados: e.target.value })}
              className="input"
            />
          </Field>
          <Field label="Alcaldía / Colonia">
            <input
              type="text"
              value={c.direccion}
              onChange={(e) => set({ direccion: e.target.value })}
              className="input"
            />
          </Field>

          <div className="sm:col-span-2">
            <Field label="Notas (opcional)">
              <textarea
                rows={3}
                value={c.notas}
                onChange={(e) => set({ notas: e.target.value })}
                placeholder="Cualquier cosa que debamos saber: accesos, alergias, estilo del evento…"
                className="input min-h-[110px]"
              />
            </Field>
          </div>
        </form>
        <p className="mt-6 text-xs text-charcoal/55 leading-relaxed max-w-xl">
          Al continuar aceptas que usemos estos datos solo para preparar la
          cotización de tu evento. No los compartimos con terceros.
        </p>
      </div>

    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="kicker text-charcoal/70 mb-1.5 block">
        {label} {required && <span className="text-brasa">*</span>}
      </span>
      {children}
    </label>
  );
}
