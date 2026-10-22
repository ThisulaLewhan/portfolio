import { About } from "@/components/about";
import { Contact, Footer } from "@/components/contact";
import { Groundwork } from "@/components/groundwork";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Person } from "@/components/person";
import { Perspective } from "@/components/perspective";
import { Skyradix } from "@/components/skyradix";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <main id="main" tabIndex={-1} className="outline-none">
        <About />
        <Perspective />
        <Skyradix />
        <Groundwork />
        <Person />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
