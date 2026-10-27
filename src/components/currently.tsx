import { currently } from "@/content/copy";
import { SectionHead } from "./section-head";

/** Same editorial list as Values, with a one-line introduction. Text lives in content/copy.ts. */
export function Currently() {
  return (
    <section id="currently" aria-labelledby="currently-title" className="section frame border-t border-rule">
      <SectionHead index="05" label={currently.label} heading={currently.heading} id="currently-title" />

      <div className="grid-12 mt-10 md:mt-14">
        <p data-reveal className="t-lead col-span-4 md:col-span-6 md:col-start-4">
          {currently.intro}
        </p>
      </div>

      <ol className="mt-12 md:mt-16">
        {currently.items.map((v, i) => (
          <li
            key={v.title}
            data-reveal
            style={{ "--d": 110 * i } as React.CSSProperties}
            className="group relative grid-12 gap-y-3 border-t border-transparent py-8 last:border-b md:py-10"
          >
            <span aria-hidden className="rule-draw -top-px h-px bg-rule" />
            {i === currently.items.length - 1 && <span aria-hidden className="rule-draw -bottom-px h-px bg-rule" />}
            <span className="t-meta col-span-4 flex items-center gap-3 pt-[0.55em] text-ink-2 md:col-span-3">
              <span
                aria-hidden
                className="size-2 bg-rule transition-[background-color,transform] duration-300 group-hover:scale-125 group-hover:bg-red"
              />
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="t-h3 col-span-4 md:col-span-5">{v.title}</h3>
            <p className="col-span-4 text-ink-2 md:col-span-4 md:pt-[0.35em]">{v.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
