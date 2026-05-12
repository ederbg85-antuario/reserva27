import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/landing/Hero";
import CervezasMarquee from "@/components/landing/CervezasMarquee";
import Nosotros from "@/components/landing/Nosotros";
import CotizaTiempoReal from "@/components/landing/CotizaTiempoReal";
import Equipo from "@/components/landing/Equipo";
import Galeria from "@/components/landing/Galeria";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <main>
      <Navbar tone="dark" />
      <Hero />
      <CervezasMarquee />
      <Nosotros />
      <CotizaTiempoReal />
      <Equipo />
      <Galeria />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
