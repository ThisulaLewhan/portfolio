import { values } from "@/content/copy";
import { SectionMotion } from "./section-motion";
import { SectionHead } from "./section-head";

/**
 * Continues the dark field from Skyradix. The three principles are ember glass
 * cards: they tip up out of the dark as you scroll and tilt toward the pointer.
 */
export function Values() {
  return (
    <section id="approach" data-surface="dark" aria-labelledby="values-title" className="on-night section relative overflow-hidden bg-night text-night-text">
      {/* Ambient light that drifts behind the cards */}
      <div
        aria-hidden
        data-g="glow"
        className="pointer-events-none absolute left-1/2 top-[38%] h-[70vw] w-[70vw] max-h-[60rem] max-w-[60rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl [background:radial-gradient(closest-side,rgba(224,36,54,0.16),transparent)]"
      />
      <div className="frame relative">
        <SectionHead index="04" label="Approach" heading={values.heading} id="values-title" night motion />

        <ol className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-7 [perspective:1400px]">
          {values.items.map((v, i) => (
            <li key={v.title} data-g="card">
              <div data-tilt className="ember-card h-full min-h-[17rem] md:min-h-[21rem]">
                <span aria-hidden className="ember-chip">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3 mt-10 md:mt-16">{v.title}</h3>
                <p className="mt-4 text-night-muted">{v.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <SectionMotion id="approach" />
    </section>
  );
}
