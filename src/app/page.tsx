import { About } from "@/components/about";
import { Background } from "@/components/background";
import { Contact, Footer } from "@/components/contact";
import { Currently } from "@/components/currently";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Notes } from "@/components/notes";
import { Reveals } from "@/components/reveals";
import { Skyradix } from "@/components/skyradix";
import { Values } from "@/components/values";
import { site } from "@/config/site";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Skyradix />
        <Values />
        <Currently />
        <Background />
        {site.showNotes && <Notes />}
        <Contact />
      </main>
      <Footer />
      <Reveals />
    </>
  );
}
