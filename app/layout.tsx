import type { Metadata, Viewport } from "next";
import { Anton, Montserrat } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BRAND } from "@/lib/brand";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reserva27.mx"),
  title: {
    default: "Reserva 27 · Barra de Micheladas para Eventos",
    template: "%s · Reserva 27",
  },
  description:
    "Barra móvil de micheladas para eventos en CDMX y área metropolitana. Tú pones el evento, nosotros las micheladas.",
  applicationName: "Reserva 27",
  authors: [{ name: "Reserva 27" }],
  keywords: [
    "micheladas para eventos",
    "barra de micheladas",
    "Reserva 27",
    "CDMX",
    "bodas",
    "XV años",
    "eventos corporativos",
    "barra móvil",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://reserva27.mx",
    siteName: "Reserva 27",
    title: "Reserva 27 · Barra de Micheladas para Eventos",
    description:
      "Tú pones el evento, nosotros las micheladas. Barra completa, manos expertas, buena onda.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reserva 27 · Barra de Micheladas para Eventos",
    description: "Tú pones el evento, nosotros las micheladas.",
  },
  icons: {
    icon: "/logo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#1F1F1F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={`${display.variable} ${body.variable}`}>
      <body className="bg-crema text-charcoal antialiased">
        {children}
        <WhatsAppButton phone={BRAND.whatsappE164} />
      </body>
    </html>
  );
}
