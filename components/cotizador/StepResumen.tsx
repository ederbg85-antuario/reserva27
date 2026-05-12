"use client";

import { useState } from "react";
import { useQuote } from "./QuoteContext";
import { formatMXN } from "@/lib/pricing";
import { saveQuote } from "@/lib/repository";
import { CHILES } from "@/lib/catalog";
import { BRAND } from "@/lib/brand";
import { Download, MessageCircle, CheckCircle2 } from "lucide-react";

export default function StepResumen() {
  const { state, quote } = useQuote();
  const [saving, setSaving] = useState(false);
  const [savedOK, setSavedOK] = useState(false);

  const chile = CHILES.find((c) => c.id === state.chileId);

  async function handleDownload() {
    try {
      setSaving(true);
      // Lazy-load jsPDF (≈ 80kB) sólo cuando el usuario lo necesita
      const { generateQuotePdf } = await import("@/lib/pdf");
      // Persistencia (stub que luego conectaremos a Supabase)
      await saveQuote({
        cliente: state.cliente,
        seleccion: {
          totalMicheladas: state.totalMicheladas,
          horasEvento: state.horasEvento,
          sabores: state.sabores,
          chileId: state.chileId,
          conClamato: state.conClamato,
          cervezas: state.cervezas.map((c) => ({
            id: c.cerveza.id,
            nombre: `${c.cerveza.marca}${c.cerveza.variante ? " " + c.cerveza.variante : ""}`,
            cantidad: c.cantidad,
          })),
          extras: state.extras.map((e) => ({ id: e.extra.id, cantidad: e.cantidad })),
        },
        total: quote.total,
      });
      generateQuotePdf({
        cliente: state.cliente,
        quote,
        meta: {
          micheladas: state.totalMicheladas,
          sabores: state.sabores.map((s) => ({ nombre: s.nombre, cantidad: s.cantidad })),
          chile: chile?.nombre ?? "—",
          conClamato: state.conClamato,
          cervezas: state.cervezas.map((c) => ({
            nombre: `${c.cerveza.marca}${c.cerveza.variante ? " " + c.cerveza.variante : ""}`,
            cantidad: c.cantidad,
            precio: c.cerveza.precio,
          })),
          horasEvento: state.horasEvento,
        },
      });
      setSavedOK(true);
    } finally {
      setSaving(false);
    }
  }

  const waMessage = encodeURIComponent(
    `Hola Reserva 27, soy ${state.cliente.nombre || "[nombre]"}.\n` +
      `Acabo de armar una cotización para ${state.cliente.tipoEvento || "mi evento"} el ${state.cliente.fecha || "[fecha]"}.\n` +
      `Total estimado: ${formatMXN(quote.total)} para ${state.totalMicheladas} micheladas.\n` +
      `¿Podemos cerrar los detalles?`
  );

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 size={22} className="text-brasa" />
          <p className="kicker text-brasa">Cotización lista</p>
        </div>
        <h2 className="text-charcoal">El desglose de tu evento.</h2>
        <p className="mt-4 text-charcoal/70 text-base sm:text-lg leading-relaxed max-w-xl">
          Revisa cada línea. Si todo se ve bien, descarga el PDF y mándanos un
          WhatsApp para apartar tu fecha.
        </p>

        {/* Total box */}
        <div className="mt-8 rounded-3xl bg-charcoal text-crema p-6 sm:p-8 shadow-soft">
          <p className="kicker text-champagne">Total estimado</p>
          <p className="mt-2 font-display uppercase text-5xl sm:text-6xl text-champagne tabular-nums">
            {formatMXN(quote.total)}
          </p>
          <p className="mt-2 text-crema/70 text-sm">
            {state.totalMicheladas} micheladas · {state.cervezas.reduce((a, c) => a + c.cantidad, 0)} cervezas · {state.horasEvento}h de servicio
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={saving}
              className="btn-primary w-full sm:w-auto disabled:opacity-60"
            >
              <Download size={16} />
              {saving ? "Generando…" : "Descargar PDF"}
            </button>
            <a
              href={`https://wa.me/${BRAND.whatsappE164}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-on-dark w-full sm:w-auto"
            >
              <MessageCircle size={16} />
              Enviar por WhatsApp
            </a>
          </div>
          {savedOK && (
            <p className="mt-4 text-xs text-champagne">
              Cotización descargada. Te seguimos por WhatsApp.
            </p>
          )}
        </div>

        {/* Desglose */}
        <div className="mt-8 card overflow-hidden">
          <div className="px-5 py-4 border-b border-charcoal/10 flex items-center justify-between">
            <p className="kicker text-charcoal/70">Desglose</p>
            <p className="text-xs text-charcoal/50">MXN</p>
          </div>
          <ul className="divide-y divide-charcoal/10">
            {quote.lineas.map((l, i) => (
              <li key={i} className="px-5 py-3 flex justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-charcoal font-medium leading-snug">
                    {l.concepto}
                  </p>
                  {l.detalle && (
                    <p className="text-xs text-charcoal/55 mt-0.5">{l.detalle}</p>
                  )}
                </div>
                <p className="font-semibold tabular-nums text-charcoal whitespace-nowrap">
                  {formatMXN(l.importe)}
                </p>
              </li>
            ))}
            <li className="px-5 py-4 bg-champagne-50 flex justify-between">
              <p className="font-display uppercase text-charcoal">Subtotal</p>
              <p className="font-display uppercase text-charcoal tabular-nums">
                {formatMXN(quote.subtotal)}
              </p>
            </li>
          </ul>
        </div>

        {/* Resumen selección */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <InfoCard title="Sabores">
            {state.sabores.length === 0 ? (
              <p className="text-charcoal/60 text-sm">Sin sabores asignados.</p>
            ) : (
              <ul className="space-y-1 text-sm">
                {state.sabores.map((s) => (
                  <li key={s.id} className="flex justify-between">
                    <span>{s.nombre}</span>
                    <span className="font-semibold tabular-nums">{s.cantidad}</span>
                  </li>
                ))}
              </ul>
            )}
          </InfoCard>
          <InfoCard title="Preparación">
            <ul className="text-sm space-y-1">
              <li className="flex justify-between">
                <span>Escarcha</span>
                <span className="font-semibold">{chile?.nombre ?? "—"}</span>
              </li>
              <li className="flex justify-between">
                <span>Clamato</span>
                <span className="font-semibold">{state.conClamato ? "Sí" : "No"}</span>
              </li>
              <li className="flex justify-between">
                <span>Duración</span>
                <span className="font-semibold">{state.horasEvento} h</span>
              </li>
            </ul>
          </InfoCard>
          <InfoCard title="Cervezas">
            {state.cervezas.length === 0 ? (
              <p className="text-charcoal/60 text-sm">Sin cervezas seleccionadas.</p>
            ) : (
              <ul className="text-sm space-y-1">
                {state.cervezas.map((c) => (
                  <li key={c.cerveza.id} className="flex justify-between gap-3">
                    <span className="truncate">
                      {c.cerveza.marca}
                      {c.cerveza.variante ? ` ${c.cerveza.variante}` : ""}
                    </span>
                    <span className="font-semibold tabular-nums">{c.cantidad}</span>
                  </li>
                ))}
              </ul>
            )}
          </InfoCard>
          <InfoCard title="Contacto">
            <ul className="text-sm space-y-1">
              <li><strong>{state.cliente.nombre || "—"}</strong></li>
              <li className="text-charcoal/70">{state.cliente.email || "—"}</li>
              <li className="text-charcoal/70">{state.cliente.telefono || "—"}</li>
              <li className="text-charcoal/70">
                {state.cliente.fecha || "—"}{state.cliente.hora ? ` · ${state.cliente.hora}` : ""}
              </li>
              <li className="text-charcoal/70">{state.cliente.direccion || "—"}</li>
            </ul>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-5">
      <p className="kicker text-charcoal/70 mb-3">{title}</p>
      {children}
    </div>
  );
}
