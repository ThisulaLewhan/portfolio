import { groundwork } from "@/content/copy";
import { ChapterTitle } from "./radical";

/** Supporting evidence, not a CV: four places, each with what it taught. */
export function Groundwork() {
  return (
    <section id="groundwork" aria-labelledby="groundwork-title" className="chapter wrap">
      <div className="grid gap-10 lg:grid-cols-12">
        <ChapterTitle label="Background" id="groundwork-title" className="lg:col-span-8">
          {groundwork.title}
        </ChapterTitle>
        <p className="lead max-w-[28ch] text-ash lg:col-span-4 lg:self-end">{groundwork.intro}</p>
      </div>

      <ol className="mt-16 border-t border-hairline lg:mt-24">
        {groundwork.rows.map((row) => (
          <li
            key={row.org}
            className="group relative grid gap-x-8 gap-y-4 border-b border-hairline py-9 transition-colors duration-300 lg:grid-cols-12 lg:py-12 [@media(hover:hover)]:hover:bg-graphite"
          >
            <h3 className="display text-[clamp(2.6rem,1.6rem+3.8vw,5.4rem)] lg:col-span-5 lg:pl-6">
              <span className="relative inline-block pt-[0.1em]">
                {/* On hover the name goes under the root, like every title on the site */}
                <span
                  aria-hidden
                  className="absolute top-0 left-0 right-0 h-[var(--stroke)] origin-left scale-x-0 bg-ultra transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-x-100"
                />
                {row.org}
              </span>
            </h3>
            <div className="lg:col-span-3">
              <p className="text-[1.1rem] font-semibold">{row.role}</p>
              <p className="mt-1 text-ash">{row.when}</p>
            </div>
            <div className="max-w-[46ch] lg:col-span-4 lg:pr-6">
              <p className="text-bone-dim">{row.body}</p>
              {row.note && <p className="mt-3 text-[0.95rem] text-ash">{row.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
