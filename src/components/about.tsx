import Image from "next/image";
import { site } from "@/config/site";
import { about } from "@/content/copy";
import { SectionHead } from "./section-head";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section frame">
      <SectionHead index="02" label="About" heading={about.heading} id="about-title" />

      <div className="grid-12 mt-14 gap-y-14 md:mt-20">
        <div className="col-span-4 md:col-span-5 md:col-start-4">
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

        {site.portrait.src && (
          <figure data-reveal="mask" className="col-span-3 m-0 md:col-span-3 md:col-start-10" style={{ "--d": 150 } as React.CSSProperties}>
            {/* Uncovered from the bottom edge as it arrives; a few percent of parallax on desktop */}
            <div className="mask-frame relative aspect-[4/5] overflow-hidden rounded-[4px] bg-paper-2">
              <div className="parallax absolute inset-x-0 -inset-y-[4%]">
                <div className="mask-image absolute inset-0">
                  <Image
                    src={site.portrait.src}
                    alt={site.portrait.alt}
                    fill
                    sizes="(min-width: 768px) 24vw, 75vw"
                    className="object-cover object-[50%_30%] saturate-[0.85]"
                  />
                </div>
              </div>
            </div>
            <figcaption data-reveal className="t-meta mt-3 flex justify-between text-ink-2" style={{ "--d": 450 } as React.CSSProperties}>
              <span>{site.firstName}</span>
              <span>{site.location}</span>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
