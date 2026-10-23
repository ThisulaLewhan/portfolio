import { background } from "@/content/copy";
import { SectionHead } from "./section-head";

export function Background() {
  return (
    <section id="background" aria-labelledby="background-title" className="section frame border-t border-rule">
      <SectionHead index="05" label="Background" heading={background.heading} id="background-title" />

      <div className="grid-12 mt-10 md:mt-14">
        <p data-reveal className="t-lead col-span-4 md:col-span-6 md:col-start-4">
          {background.intro}
        </p>
      </div>

      <ul className="grid-12 mt-14 gap-y-8 md:mt-20">
        {background.items.map((item, i) => (
          <li
            key={item.place}
            data-reveal
            style={{ "--d": 100 * i } as React.CSSProperties}
            className={`col-span-4 border-t-2 border-ink pt-5 md:col-span-3 ${i === 0 ? "md:col-start-4" : ""}`}
          >
            <p className="text-[1.15rem] leading-snug font-semibold tracking-[-0.02em] [font-family:var(--font-display)]">
              {item.place}
            </p>
            <p className="mt-2 text-ink-2">{item.detail}</p>
          </li>
        ))}
      </ul>

      <div className="grid-12 mt-14 md:mt-20">
        <p data-reveal className="measure col-span-4 text-ink-2 md:col-span-6 md:col-start-4">
          {background.closing}
        </p>
      </div>
    </section>
  );
}
