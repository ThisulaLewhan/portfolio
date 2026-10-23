/**
 * Every personal detail and external link on the site lives here.
 * Leave a value as an empty string to hide whatever depends on it.
 */

/**
 * Set NEXT_PUBLIC_SITE_URL (e.g. https://thisulalewhan.com) once a custom
 * domain is in place. Canonical URLs, the sitemap and robots.txt use it;
 * until then they fall back to the Vercel production URL.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "";
}

export const site = {
  url: resolveSiteUrl(),
  name: "Thisula Lewhan",
  firstName: "Thisula",
  lastName: "Lewhan",
  location: "Colombo, Sri Lanka",
  identity: "Entrepreneur. Founder of Skyradix.",
  /** The browser tab and share title: just the name. */
  title: "Thisula Lewhan",
  description:
    "Thisula Lewhan is an entrepreneur and the founder of Skyradix, building his own path through business and technology from Colombo, Sri Lanka.",

  portrait: {
    /** Cut-out on a transparent background, trimmed to the subject. The hash in
     *  the name changes with the content, so caches never serve an old copy. */
    src: "/images/hero-thisula.e7b7e830.webp",
    width: 1971,
    height: 2000,
    alt: "Thisula Lewhan in a dark suit and tie",
  },

  links: {
    /** Published on github.com/ThisulaLewhan. */
    email: "ntlewhan@gmail.com",
    linkedin: "https://www.linkedin.com/in/thisula-lewhan",
    /** Linked from github.com/ThisulaLewhan. */
    instagram: "https://www.instagram.com/thisula._",
    skyradix: "https://www.skyradix.com",
  },

  /** Hide the Notes section until there's something to show, if you prefer. */
  showNotes: true,

  copyrightYear: 2026,
} as const;

export function mailto(address: string, subject?: string): string {
  if (!address) return "";
  return subject ? `mailto:${address}?subject=${encodeURIComponent(subject)}` : `mailto:${address}`;
}

/** "https://www.skyradix.com" → "skyradix.com" */
export function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
