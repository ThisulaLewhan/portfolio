import Image from "next/image";
import { site } from "@/config/site";
import { hero } from "@/content/copy";
import { Arrow } from "./icons";

/**
 * A dark poster. The name is set across the full width, "Thisula" on the
 * left edge and "Lewhan." on the right, and the cut-out portrait stands in
 * front of it so the head fills the gap between the words. The details sit
 * in the four quiet corners around the figure.
 *
 * Below 1280px the poster keeps the name and portrait, and the details move
 * into a band underneath; below 1024px the name stacks on two lines.
 *
 * Entrance (about 1.2s, nothing waits on it): the portrait settles into place
 * first, then the name rises up from behind it and the details follow.
 */
export function Hero() {
  return (
    <section id="top" data-surface="dark" aria-labelledby="hero-name" className="hero on-night relative overflow-hidden bg-night text-night-text">
      <div className="hero-poster relative">
        {/* A soft pool of light behind the figure */}
        <div aria-hidden className="hero-spot pointer-events-none absolute inset-0" />

        <h1 id="hero-name" className="hero-name t-display absolute inset-x-[var(--margin)] z-0">
          <span className="block overflow-hidden pb-[0.06em] lg:inline-block">
            <span className="rise" style={{ "--d": 280 } as React.CSSProperties}>
              {site.firstName}
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em] text-right lg:inline-block">
            <span className="rise" style={{ "--d": 300 } as React.CSSProperties}>
              {site.lastName}
              <span className="text-red">.</span>
            </span>
          </span>
        </h1>

        {site.portrait.src && (
          <div className="hero-figure absolute bottom-0 z-10">
            <Image
              src={site.portrait.src}
              alt={site.portrait.alt}
              width={site.portrait.width}
              height={site.portrait.height}
              preload
              sizes="(min-width: 1280px) 60vw, (min-width: 768px) 80vw, 115vw"
              className="h-full w-auto max-w-none select-none"
              draggable={false}
            />
          </div>
        )}
      </div>

      {/* Details: a band under the poster on smaller screens, the poster's corners on large ones */}
      <div className="frame relative z-20 grid gap-8 pt-10 pb-8 md:grid-cols-2 md:gap-x-10 xl:contents">
        <div className="hero-under grid gap-6 md:col-span-2 md:grid-cols-2 md:gap-x-10 xl:absolute xl:inset-x-[var(--margin)] xl:flex xl:justify-between">
          <p className="hero-id fade t-h3 flex items-start gap-3 xl:max-w-[21rem]" style={{ "--d": 280 } as React.CSSProperties}>
            <span aria-hidden className="mt-[0.36em] size-[0.42em] flex-none bg-red" />
            <span>
              Entrepreneur.
              <br />
              Founder of Skyradix.
            </span>
          </p>
          <p
            className="fade max-w-[40ch] text-[1.06rem] leading-[1.55] text-night-muted xl:max-w-[19rem] xl:pt-1"
            style={{ "--d": 380 } as React.CSSProperties}
          >
            {hero.intro}
          </p>
        </div>

        <div
          className="fade flex flex-wrap items-center gap-x-6 gap-y-3 xl:absolute xl:bottom-[max(2.5rem,5vh)] xl:left-[var(--margin)] xl:flex-col xl:items-start"
          style={{ "--d": 470 } as React.CSSProperties}
        >
          <a href="#contact" className="btn btn-red btn-cta">
            {hero.primary}
            <Arrow className="arrow" />
          </a>
          <a href="#skyradix" className="group inline-flex min-h-11 items-center gap-2 font-medium">
            <span className="u-link u-link-static">{hero.secondary}</span>
            <Arrow className="arrow" />
          </a>
        </div>

        <div
          className="fade t-meta flex items-center justify-between gap-6 border-t border-night-rule pt-4 text-night-muted md:col-span-2 xl:absolute xl:right-[var(--margin)] xl:bottom-[max(2.5rem,5vh)] xl:flex-col xl:items-end xl:border-0 xl:pt-0"
          style={{ "--d": 560 } as React.CSSProperties}
        >
          <span>{site.location}</span>
          <a href="#about" className="group inline-flex items-center gap-1.5 hover:text-night-text">
            <span className="u-link">Read on</span>
            <Arrow className="arrow rotate-90" size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
