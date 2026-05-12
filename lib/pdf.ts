"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { formatMXN, type QuoteBreakdown } from "./pricing";
import { BRAND } from "./brand";
import type { ClienteData } from "@/components/cotizador/QuoteContext";

type GeneratePdfArgs = {
  cliente: ClienteData;
  quote: QuoteBreakdown;
  meta: {
    micheladas: number;
    sabores: { nombre: string; cantidad: number }[];
    chile: string;
    conClamato: boolean;
    cervezas: { nombre: string; cantidad: number; precio: number }[];
    horasEvento: number;
  };
};

const CHARCOAL: [number, number, number] = [31, 31, 31];
const CHAMPAGNE: [number, number, number] = [215, 178, 139];
const BRASA: [number, number, number] = [217, 96, 42];

export function generateQuotePdf({ cliente, quote, meta }: GeneratePdfArgs) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;

  // Header bar
  doc.setFillColor(...CHARCOAL);
  doc.rect(0, 0, pageWidth, 120, "F");

  // Wordmark
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.text("RESERVA", margin, 60);
  doc.setTextColor(...CHAMPAGNE);
  doc.text("27", margin + 122, 60);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(245, 239, 230);
  doc.setFontSize(9);
  doc.text("BARRA DE MICHELADAS PARA EVENTOS · CDMX", margin, 78);
  doc.setTextColor(...CHAMPAGNE);
  doc.text("Cotización", pageWidth - margin, 78, { align: "right" });
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text(
    new Date().toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    pageWidth - margin,
    94,
    { align: "right" }
  );

  // Client block
  let y = 152;
  doc.setTextColor(...CHARCOAL);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("PARA", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  y += 16;
  doc.text(cliente.nombre || "—", margin, y);
  y += 14;
  doc.text(`${cliente.email || "—"}  ·  ${cliente.telefono || "—"}`, margin, y);
  y += 14;
  doc.text(
    `Evento: ${cliente.tipoEvento || "—"} · ${cliente.fecha || "—"}${
      cliente.hora ? " · " + cliente.hora : ""
    }`,
    margin,
    y
  );
  if (cliente.direccion) {
    y += 14;
    doc.text(`Ubicación: ${cliente.direccion}`, margin, y);
  }
  if (cliente.invitados) {
    y += 14;
    doc.text(`Invitados aprox.: ${cliente.invitados}`, margin, y);
  }

  // Summary callouts
  y += 28;
  drawCallout(doc, margin, y, "Micheladas", String(meta.micheladas));
  drawCallout(doc, margin + 170, y, "Sabores", String(meta.sabores.length));
  drawCallout(doc, margin + 340, y, "Cervezas",
    String(meta.cervezas.reduce((a, c) => a + c.cantidad, 0))
  );
  y += 70;

  // Líneas detalle (tabla)
  autoTable(doc, {
    startY: y,
    head: [["Concepto", "Detalle", "Cant.", "Importe"]],
    body: quote.lineas.map((l) => [
      l.concepto,
      l.detalle ?? "",
      l.cantidad ? String(l.cantidad) : "",
      formatMXN(l.importe),
    ]),
    styles: {
      font: "helvetica",
      fontSize: 9,
      cellPadding: { top: 7, bottom: 7, left: 8, right: 8 },
      textColor: CHARCOAL,
      lineColor: [231, 226, 215],
      lineWidth: 0.4,
    },
    headStyles: {
      fillColor: CHARCOAL,
      textColor: 255,
      fontStyle: "bold",
      halign: "left",
    },
    columnStyles: {
      2: { halign: "right", cellWidth: 50 },
      3: { halign: "right", cellWidth: 80, fontStyle: "bold" },
    },
    alternateRowStyles: { fillColor: [251, 246, 238] },
    margin: { left: margin, right: margin },
  });

  // Totals box
  let endY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 24;
  if (endY > pageHeight - 200) {
    doc.addPage();
    endY = margin;
  }

  doc.setFillColor(...CHARCOAL);
  doc.roundedRect(margin, endY, pageWidth - margin * 2, 90, 10, 10, "F");
  doc.setTextColor(...CHAMPAGNE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("SUBTOTAL", margin + 18, endY + 26);
  doc.text("TOTAL ESTIMADO", margin + 18, endY + 62);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(formatMXN(quote.subtotal), pageWidth - margin - 18, endY + 26, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...CHAMPAGNE);
  doc.text(formatMXN(quote.total), pageWidth - margin - 18, endY + 66, { align: "right" });

  // Notas
  endY += 110;
  doc.setTextColor(...CHARCOAL);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Notas", margin, endY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(70, 70, 70);
  const notas =
    "· Cotización informativa. Para apartar la fecha se requiere anticipo del 50%.\n" +
    "· Cobertura: CDMX y zona metropolitana. Para fuera de cobertura consulta WhatsApp.\n" +
    "· Vigencia de cotización: 15 días a partir de la fecha de emisión.\n" +
    "· Precios en pesos mexicanos (MXN). IVA no incluido salvo que se solicite factura.";
  doc.text(notas, margin, endY + 16, { maxWidth: pageWidth - margin * 2, lineHeightFactor: 1.5 });

  // Footer
  const footY = pageHeight - 40;
  doc.setDrawColor(...CHAMPAGNE);
  doc.line(margin, footY - 16, pageWidth - margin, footY - 16);
  doc.setFontSize(8);
  doc.setTextColor(...CHARCOAL);
  doc.text(`reserva27.mx  ·  WhatsApp ${BRAND.whatsappDisplay}`, margin, footY);
  doc.text(BRAND.city, pageWidth - margin, footY, { align: "right" });

  const filename = `Reserva27_Cotizacion_${(cliente.nombre || "evento").replace(/\s+/g, "_")}.pdf`;
  doc.save(filename);
}

function drawCallout(
  doc: jsPDF,
  x: number,
  y: number,
  label: string,
  value: string
) {
  doc.setFillColor(245, 239, 230);
  doc.roundedRect(x, y, 150, 50, 8, 8, "F");
  doc.setTextColor(...CHARCOAL);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(label.toUpperCase(), x + 12, y + 18);
  doc.setFontSize(18);
  doc.setTextColor(...BRASA);
  doc.text(value, x + 12, y + 38);
}
