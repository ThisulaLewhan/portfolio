import { site } from "@/config/site";
import { hero } from "@/content/copy";
import { Arrow } from "./icons";

/**
 * A Swiss poster: the details set small across the top of the grid, the name
 * set very large along the bottom, its second line offset to column four.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-name" className="frame relative flex flex-col pt-24 pb-6 sm:min-h-[100svh] sm:pt-[max(6rem,min(8rem,14vh))]">
      <div className="grid-12 order-2 mt-10 gap-y-8 sm:order-none sm:mt-0">
        <p className="fade col-span-4 md:col-span-5" style={{ "--d": 450 } as React.CSSProperties}>
          <span className="t-h3 flex items-start gap-3">
            <span aria-hidden className="mt-[0.36em] size-[0.42em] flex-none bg-red" />
            <span>
              Entrepreneur.
              <br />
              Founder of Skyradix.
            </span>
          </span>
        </p>
        <div className="fade col-span-4 md:col-span-5 md:col-start-8" style={{ "--d": 600 } as React.CSSProperties}>
          <p className="text-[1.12rem] leading-[1.55] text-ink-2 [font-variation-settings:'opsz'_20]">{hero.intro}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#contact" className="btn btn-red">
              {hero.primary}
              <Arrow className="arrow" />
            </a>
            <a href="#skyradix" className="group inline-flex min-h-11 items-center gap-2 font-medium">
              <span className="u-link u-link-static">{hero.secondary}</span>
              <Arrow className="arrow" />
            </a>
          </div>
        </div>
      </div>

      <h1 id="hero-name" className="t-display drift order-1 pt-4 text-[clamp(4.4rem,23vw,8rem)] sm:order-none sm:mt-auto sm:pt-[min(4rem,5vh)] sm:text-[length:min(24vw,29vh)] md:text-[length:min(19vw,29vh)]" style={{ "--drift-from": "0%", "--drift-to": "-14%" } as React.CSSProperties}>
        <span className="block overflow-hidden pb-[0.06em]">
          <span className="rise" style={{ "--d": 0 } as React.CSSProperties}>
            {site.firstName}
          </span>
        </span>
        <span className="block overflow-hidden pb-[0.08em] pl-[9%] md:pl-[calc((100%+var(--gap))/12*3)]">
          <span className="rise" style={{ "--d": 120 } as React.CSSProperties}>
            {site.lastName}
            <span className="text-red">.</span>
          </span>
        </span>
      </h1>

      <div className="fade grid-12 order-3 mt-12 border-t border-rule pt-4 sm:order-none sm:mt-0" style={{ "--d": 800 } as React.CSSProperties}>
        <p className="t-meta col-span-2 text-ink-2 md:col-span-3">{site.location}</p>
        <p className="t-meta col-span-2 text-right md:col-span-3 md:col-start-10">
          <a href="#about" className="group inline-flex items-center gap-1.5 text-ink-2 hover:text-ink">
            <span className="u-link">Read on</span>
            <Arrow className="arrow rotate-90" size={12} />
          </a>
        </p>
      </div>
    </section>
  );
}
