import { prettyUrl, site } from "@/config/site";
import { skyradix } from "@/content/copy";
import { ArrowUpRight } from "./icons";

/**
 * The one dark field on the page. The name is set at poster size, and a
 * frosted panel slides over its lower half, so the letters read through the
 * glass.
 */
export function Skyradix() {
  const url = site.links.skyradix;
  return (
    <section id="skyradix" aria-labelledby="skyradix-title" className="on-night section relative overflow-hidden bg-night text-night-text">
      <div className="frame">
        <div className="grid-12">
          <p className="t-meta col-span-4 flex gap-3 text-night-muted md:col-span-3">
            <span className="text-red">03</span>
            <span>Skyradix</span>
          </p>
        </div>

        <div className="relative mt-10 md:mt-14">
          <h2
            id="skyradix-title"
            className="t-display drift relative z-0 text-[24vw] leading-[0.8] text-night-text md:text-[21vw]"
            style={{ "--drift-from": "4%", "--drift-to": "-10%" } as React.CSSProperties}
          >
            Skyradix<span className="text-red">.</span>
          </h2>

          <div className="grid-12 relative z-10 -mt-[2vw] sm:-mt-[6vw] md:-mt-[8.5vw]">
            <div data-reveal className="glass-dark col-span-4 rounded-[14px] p-7 sm:p-9 md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
              <p className="t-h3">{skyradix.line}</p>
              <div className="mt-6 grid gap-4 text-[1.06rem] leading-relaxed text-night-muted">
                {skyradix.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {url && (
                <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                    {skyradix.action}
                    <ArrowUpRight className="arrow" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  <span className="t-meta text-night-muted">{prettyUrl(url)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
