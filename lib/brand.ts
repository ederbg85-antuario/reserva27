/**
 * Constantes de marca tomadas del BrandBook Reserva 27 — Edición 2025.
 * Mantener consistencia con el manual: paleta, tipografía, tono y contacto.
 */
export const BRAND = {
  name: "Reserva 27",
  tagline: "Barra de Micheladas para Eventos",
  hero: "Tú pones el evento, nosotros las micheladas.",
  city: "CDMX & Área Metropolitana",
  email: "hola@reserva27.mx",
  whatsappE164: "525538792176", // formato internacional sin +
  whatsappDisplay: "55 38 79 21 76",
  url: "https://reserva27.mx",
  instagram: "@reserva27.mx",
  colors: {
    charcoal: "#1F1F1F",
    champagne: "#D7B28B",
    brasa: "#D9602A",
    crema: "#F5EFE6",
  },
  phrases: [
    "Tú pones el evento, nosotros las micheladas.",
    "De CDMX para tu mejor noche.",
    "Barra completa, manos expertas, buena onda.",
    "Reserva la fecha — el resto va por nuestra cuenta.",
    "La michelada como debe ser: bien servida y a tiempo.",
  ],
} as const;
