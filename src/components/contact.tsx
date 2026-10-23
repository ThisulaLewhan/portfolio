import { mailto, prettyUrl, site } from "@/config/site";
import { contact, footer } from "@/content/copy";
import { CopyButton } from "./copy-button";
import { Arrow, ArrowUpRight } from "./icons";
import { SectionHead } from "./section-head";

/**
 * The ending. A red Swiss circle grows into place as the section arrives,
 * and a frosted panel sits over it, so the invitation reads as the last,
 * warmest thing on the page.
 */
export function Contact() {
  const { email, linkedin, skyradix } = site.links;
  const routes = [
    email && { label: "Email", value: email, href: mailto(email, "Hello Thisula"), external: false },
    linkedin && { label: "LinkedIn", value: prettyUrl(linkedin).replace("linkedin.com/", ""), href: linkedin, external: true },
    skyradix && { label: "Skyradix", value: prettyUrl(skyradix), href: skyradix, external: true },
  ].filter(Boolean) as { label: string; value: string; href: string; external: boolean }[];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section frame relative overflow-hidden border-t border-rule">
      <SectionHead index="07" label="Contact" heading={contact.heading} id="contact-title" />

      <div className="relative mt-14 md:mt-20">
        {/* The circle sits on the grid's right edge; the panel overlaps it */}
        <div
          aria-hidden
          className="grow-in pointer-events-none absolute top-[-6%] right-[-22vw] aspect-square w-[78vw] rounded-full bg-red md:top-[-14%] md:right-[-4vw] md:w-[min(46vw,40rem)]"
        />

        <div className="grid-12 relative">
          <div data-reveal className="glass col-span-4 rounded-[18px] p-7 sm:p-10 md:col-span-9 md:col-start-4 lg:col-span-7 lg:col-start-4">
            <div className="grid gap-2 text-[1.12rem] text-ink-2">
              {contact.lines.map((l) => (
                <p key={l} className="measure">
                  {l}
                </p>
              ))}
            </div>

            {email && (
              <div className="mt-10">
                <a
                  href={mailto(email, "Hello Thisula")}
                  className="t-h3 u-link u-link-static inline-block max-w-full break-all"
                >
                  {email}
                </a>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={mailto(email, "Hello Thisula")} className="btn btn-ink">
                    Write to me
                    <Arrow className="arrow" />
                  </a>
                  <CopyButton value={email} label="Copy address" className="btn btn-line bg-white/50" />
                </div>
              </div>
            )}

            <ul className="mt-10 border-t border-ink/10">
              {routes.map((r) => (
                <li key={r.label} className="border-b border-ink/10">
                  <a
                    href={r.href}
                    {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group grid min-h-14 grid-cols-[4.75rem_1fr_auto] sm:grid-cols-[6.5rem_1fr_auto] items-center gap-4 py-3"
                  >
                    <span className="t-meta text-ink-2">{r.label}</span>
                    <span className="truncate font-medium">
                      <span className="u-link">{r.value}</span>
                    </span>
                    {r.external ? <ArrowUpRight className="arrow" /> : <Arrow className="arrow" />}
                    {r.external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { email, linkedin, skyradix } = site.links;
  return (
    <footer className="frame border-t border-rule py-8">
      <div className="grid-12 gap-y-4">
        <p className="t-meta col-span-4 text-ink-2 md:col-span-6">
          &copy; {site.copyrightYear} {site.name}. {footer}
        </p>
        <ul className="t-meta col-span-4 flex flex-wrap gap-x-6 gap-y-2 md:col-span-6 md:justify-end">
          {linkedin && (
            <li>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="u-link inline-flex min-h-11 items-center">
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          )}
          {skyradix && (
            <li>
              <a href={skyradix} target="_blank" rel="noopener noreferrer" className="u-link inline-flex min-h-11 items-center">
                Skyradix<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          )}
          {email && (
            <li>
              <a href={mailto(email)} className="u-link inline-flex min-h-11 items-center">
                Email
              </a>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
}
