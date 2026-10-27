import { currently } from "@/content/copy";
import { SectionMotion } from "./section-motion";
import { SectionHead } from "./section-head";
import { TickGauge } from "./tick-gauge";

/**
 * A dial and three focus areas. On desktop the stage pins while you scroll: the
 * dial fills, and each focus area comes into focus in turn. Without motion it
 * reads as a plain list. Text lives in content/copy.ts.
 */
export function Currently() {
  const total = String(currently.items.length).padStart(2, "0");
  return (
    <section id="currently" aria-labelledby="currently-title" className="section frame">
      <SectionHead index="05" label={currently.label} heading={currently.heading} id="currently-title" motion />

      <div className="grid-12 mt-10 md:mt-14">
        <p data-g="intro" className="t-lead col-span-4 md:col-span-6 md:col-start-4">
          {currently.intro}
        </p>
      </div>

      <div data-g="stage" className="grid-12 mt-14 items-center gap-y-12 md:mt-20">
        <div className="gauge-wrap relative col-span-4 mx-auto aspect-square w-[min(78vw,24rem)] max-md:hidden md:col-span-5 md:w-full md:max-w-[28rem]">
          <TickGauge />
          <div className="absolute inset-0 grid place-content-center text-center">
            <span data-g="gauge-num" className="t-display text-[clamp(3.5rem,8vw,6rem)] tabular-nums">
              {total}
            </span>
            <span data-g="gauge-label" className="t-meta mt-3 text-ink-2">
              focus areas
            </span>
          </div>
        </div>

        <ol data-g="steps" className="col-span-4 md:col-span-6 md:col-start-7">
          {currently.items.map((v, i) => (
            <li key={v.title} data-g="step" className="flex items-start gap-5 border-t border-rule py-7 last:border-b md:block md:py-9">
              {/* Phones: each focus area carries its own small dial, filled as that row scrolls past */}
              <div data-g="mini" aria-hidden className="relative size-[5.5rem] flex-none md:hidden">
                <TickGauge count={48} hook="mini-tick" inner={70} />
                <span className="t-display absolute inset-0 grid place-items-center text-[1.6rem] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <span className="t-meta text-red-ink max-md:hidden">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 md:mt-3">{v.title}</h3>
                <p className="mt-3 max-w-[44ch] text-ink-2">{v.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <SectionMotion id="currently" fill />
    </section>
  );
}
