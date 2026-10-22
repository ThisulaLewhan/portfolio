import { mailto, site } from "@/config/site";
import { CopyButton } from "./copy-button";
import { UnderRoot } from "./radical";

type Route = { who: string; action: string; href: string; detail: string; external?: boolean };

/** The bookend: the page opens with √ THISULA LEWHAN and closes with √ LET'S TALK. */
export function Contact() {
  const { personalEmail, businessEmail } = site.contact;
  const routes = [
    businessEmail && {
      who: "A project or a business problem",
      action: "Email Skyradix",
      href: mailto(businessEmail, "Project enquiry"),
      detail: businessEmail,
    },
    personalEmail && {
      who: "An idea, a collaboration, a partnership",
      action: "Email me",
      href: mailto(personalEmail, "Let's talk"),
      detail: personalEmail,
    },
    site.social.linkedin.href && {
      who: "Professional connections",
      action: "LinkedIn",
      href: site.social.linkedin.href,
      detail: site.social.linkedin.handle,
      external: true,
    },
    site.social.instagram.href && {
      who: "We just met, or you'd like to say hello",
      action: "Instagram",
      href: site.social.instagram.href,
      detail: site.social.instagram.handle,
      external: true,
    },
  ].filter(Boolean) as Route[];

  return (
    <section id="contact" aria-labelledby="contact-title" className="chapter relative overflow-hidden border-t border-hairline">
      <div className="wrap">
        <p className="label">Contact</p>
        <h2 id="contact-title" className="display mt-6 text-[clamp(4.4rem,17vw,16rem)]">
          <UnderRoot bleed>Let&rsquo;s talk</UnderRoot>
        </h2>

        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="lead max-w-[26ch] text-bone-dim">
              Whatever brought you here, a business, an idea or a conversation, pick the route that fits.
            </p>
            {personalEmail && (
              <div className="mt-8">
                <p className="text-[1.15rem] font-medium break-all select-all">{personalEmail}</p>
                <div className="mt-4">
                  <CopyButton value={personalEmail} label="Copy my email" />
                </div>
              </div>
            )}
          </div>

          <ul className="lg:col-span-7 lg:col-start-6">
            {routes.map((r) => (
              <li key={r.action} className="border-b border-hairline first:border-t">
                <a
                  href={r.href}
                  {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group grid grid-cols-[1fr_auto] items-end gap-x-6 py-7 transition-colors duration-300 active:bg-graphite"
                >
                  <span className="min-w-0">
                    <span className="block text-ash">{r.who}</span>
                    <span className="display mt-2 block text-[clamp(2.4rem,1.6rem+3vw,4.2rem)] transition-colors duration-300 group-hover:text-ultra-text">
                      {r.action}
                    </span>
                    <span className="mt-2 block truncate text-[0.92rem] text-ash">{r.detail}</span>
                  </span>
                  <span
                    aria-hidden
                    className="mb-2 grid size-12 place-items-center rounded-full border border-hairline transition-[background-color,border-color,transform] duration-300 group-hover:-rotate-45 group-hover:border-ultra group-hover:bg-ultra"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9h11M10 4.5 14.5 9 10 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {r.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="wrap border-t border-hairline py-10 text-[0.95rem] text-ash">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <p>
          <span className="font-semibold text-bone">{site.name}</span>
          <br />
          Founder of{" "}
          <a href={site.skyradix.url} target="_blank" rel="noopener noreferrer" className="link">
            Skyradix
          </a>
          , {site.location}
        </p>
        <ul className="flex flex-wrap gap-x-6">
          {Object.values(site.social)
            .filter((s) => s.href)
            .map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center">
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          <li>
            <a href="#top" className="link inline-flex min-h-11 items-center">
              Back to the top
            </a>
          </li>
        </ul>
      </div>
      <p className="mt-8 text-[0.85rem]">&copy; {site.copyrightYear} {site.name}</p>
    </footer>
  );
}
