import { about } from "@/content/copy";
import { SectionHead } from "./section-head";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section frame">
      <SectionHead index="02" label="About" heading={about.heading} id="about-title" />

      <div className="grid-12 mt-14 gap-y-14 md:mt-20">
        <div className="col-span-4 md:col-span-6 md:col-start-4">
          <p data-reveal className="t-lead">
            {about.lead}
          </p>
          <div className="mt-8 grid gap-5 text-ink-2">
            {about.paragraphs.map((p, i) => (
              <p key={p} data-reveal style={{ "--d": 120 * (i + 1) } as React.CSSProperties} className="measure">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
