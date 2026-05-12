import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/landing/Hero";
import Manifiesto from "@/components/landing/Manifiesto";
import Servicio from "@/components/landing/Servicio";
import Audiencia from "@/components/landing/Audiencia";
import Galeria from "@/components/landing/Galeria";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <main>
      <Navbar tone="dark" />
      <Hero />
      <Manifiesto />
      <Servicio />
      <Audiencia />
      <Galeria />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
