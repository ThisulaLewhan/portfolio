import { notes } from "@/content/copy";
import { ArrowUpRight } from "./icons";
import { SectionHead } from "./section-head";

/** Quiet by design. Real notes listed in content/copy.ts appear here automatically. */
export function Notes() {
  return (
    <section aria-labelledby="notes-title" className="section frame border-t border-rule">
      <SectionHead index="06" label="Notes" heading={notes.heading} id="notes-title" />
      <div className="grid-12 mt-10 md:mt-14">
        <div className="col-span-4 md:col-span-6 md:col-start-4">
          <p data-reveal className="t-lead">
            {notes.lead}
          </p>
          <p data-reveal style={{ "--d": 120 } as React.CSSProperties} className="measure mt-5 text-ink-2">
            {notes.body}
          </p>
        </div>
      </div>

      {notes.items.length > 0 && (
        <ul className="grid-12 mt-14">
          {notes.items.map((n) => (
            <li key={n.href} className="col-span-4 border-t border-rule md:col-span-9 md:col-start-4">
              <a href={n.href} className="group flex items-baseline justify-between gap-6 py-5">
                <span>
                  <span className="t-h3 u-link block w-fit">{n.title}</span>
                  {n.summary && <span className="mt-1 block text-ink-2">{n.summary}</span>}
                </span>
                <span className="t-meta flex flex-none items-center gap-2 text-ink-2">
                  {n.date}
                  <ArrowUpRight className="arrow-ne" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
