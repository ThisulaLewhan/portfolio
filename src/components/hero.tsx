import Image from "next/image";
import { site } from "@/config/site";
import { hero } from "@/content/copy";
import { Arrow } from "./icons";

/**
 * A two-part Swiss composition. Seven columns of type on the left (identity,
 * the name at poster size, the intro and actions) and the portrait filling
 * the last five columns, full height. Below 1024px it stacks: name and
 * identity, the portrait at full width, then the intro.
 *
 * Entrance (about 1.1s, nothing waits on it): the name rises out of its
 * lines while the portrait is uncovered, then the details follow.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-name"
      className="frame relative flex flex-col pt-24 pb-6 lg:min-h-[100svh] lg:pt-[max(5.5rem,min(8rem,13vh))]"
    >
      <div className="grid-12 flex-1 gap-y-10 lg:grid-rows-[1fr_auto] lg:gap-y-6">
        {/* Identity and name */}
        <div className="col-span-4 flex flex-col gap-8 md:col-span-12 lg:col-span-7 lg:row-start-1 lg:justify-between">
          <p className="fade t-h3 order-2 flex items-start gap-3 lg:order-none" style={{ "--d": 280 } as React.CSSProperties}>
            <span aria-hidden className="mt-[0.36em] size-[0.42em] flex-none bg-red" />
            <span>
              Entrepreneur.
              <br />
              Founder of Skyradix.
            </span>
          </p>
          <h1
            id="hero-name"
            className="t-display drift order-1 text-[clamp(4.4rem,23vw,8rem)] md:text-[17vw] lg:order-none lg:text-[length:min(15vw,21vh)]"
            style={{ "--drift-from": "0%", "--drift-to": "-10%" } as React.CSSProperties}
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="rise" style={{ "--d": 40 } as React.CSSProperties}>
                {site.firstName}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="rise" style={{ "--d": 140 } as React.CSSProperties}>
                {site.lastName}
                <span className="text-red">.</span>
              </span>
            </span>
          </h1>
        </div>

        {/* Portrait: full width on phones, the whole right side on larger screens */}
        {site.portrait.src && (
          <figure className="col-span-4 m-0 md:col-span-12 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
            <div
              className="hero-mask relative aspect-[4/5] overflow-hidden rounded-[4px] bg-paper-2 sm:aspect-[4/3] lg:aspect-auto lg:h-full"
              style={{ "--d": 120 } as React.CSSProperties}
            >
              <div className="absolute inset-0 origin-center scale-[1.08]">
                <Image
                  src={site.portrait.src}
                  alt={site.portrait.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="hero-mask-image object-cover object-center"
                />
              </div>
            </div>
          </figure>
        )}

        {/* Intro and actions */}
        <div className="col-span-4 md:col-span-9 lg:col-span-7 lg:row-start-2">
          <p
            className="fade max-w-[46ch] text-[1.12rem] leading-[1.55] text-ink-2 [font-variation-settings:'opsz'_20]"
            style={{ "--d": 380 } as React.CSSProperties}
          >
            {hero.intro}
          </p>
          <div className="fade mt-7 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ "--d": 470 } as React.CSSProperties}>
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

      <div className="relative grid-12 mt-12 border-t border-transparent pt-4 lg:mt-7">
        <span aria-hidden className="line-in absolute inset-x-0 -top-px h-px bg-rule" style={{ "--d": 260 } as React.CSSProperties} />
        <p className="fade t-meta col-span-2 text-ink-2 md:col-span-3" style={{ "--d": 560 } as React.CSSProperties}>
          {site.location}
        </p>
        <p className="fade t-meta col-span-2 text-right md:col-span-3 md:col-start-10" style={{ "--d": 600 } as React.CSSProperties}>
          <a href="#about" className="group inline-flex items-center gap-1.5 text-ink-2 hover:text-ink">
            <span className="u-link">Read on</span>
            <Arrow className="arrow rotate-90" size={12} />
          </a>
        </p>
      </div>
    </section>
  );
}
