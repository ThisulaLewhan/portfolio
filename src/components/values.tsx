import { values } from "@/content/copy";
import { SectionHead } from "./section-head";

export function Values() {
  return (
    <section aria-labelledby="values-title" className="section frame">
      <SectionHead index="04" label="Values" heading={values.heading} id="values-title" />

      <ol className="mt-14 md:mt-20">
        {values.items.map((v, i) => (
          <li
            key={v.title}
            data-reveal
            style={{ "--d": 90 * i } as React.CSSProperties}
            className="group grid-12 gap-y-3 border-t border-rule py-8 last:border-b md:py-10"
          >
            <span className="t-meta col-span-4 flex items-center gap-3 pt-[0.55em] text-ink-2 md:col-span-3">
              <span
                aria-hidden
                className="size-2 bg-rule transition-colors duration-300 group-hover:bg-red"
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
