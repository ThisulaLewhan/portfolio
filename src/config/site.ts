/**
 * Every personal detail, link and contact route on the site lives here.
 * Leave a value as an empty string to hide whatever depends on it.
 */

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

/**
 * Set NEXT_PUBLIC_SITE_URL (e.g. https://thisulalewhan.com) once the
 * production domain is known. Canonical URLs, the sitemap and robots.txt use
 * it; until then they fall back to the Vercel deployment URL or are omitted.
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
  title: "Thisula Lewhan, founder of Skyradix",
  description:
    "Thisula Lewhan is the founder of Skyradix: an entrepreneur and technology-driven builder from Colombo, Sri Lanka, working where technology meets business.",

  roles: ["Founder of Skyradix", "Entrepreneur", "Technology-driven builder"],
  headline: "Ideas are easy. I'm interested in the part where they start working.",

  portrait: {
    src: "/images/thisula-lewhan.jpg",
    alt: "Portrait of Thisula Lewhan in a dark suit and blue tie",
  },

  contact: {
    /** Published on github.com/ThisulaLewhan. */
    personalEmail: "ntlewhan@gmail.com",
    /** Published on skyradix.com. */
    businessEmail: "skyradixsolutions@gmail.com",
    businessContactPage: "https://www.skyradix.com/contact",
    /** Published on skyradix.com. */
    businessWhatsApp: "https://wa.me/94702708220",
  },

  social: {
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/thisula-lewhan",
      handle: "in/thisula-lewhan",
    },
    instagram: {
      label: "Instagram",
      href: "https://instagram.com/thisula._",
      handle: "@thisula._",
    },
    github: {
      label: "GitHub",
      href: "https://github.com/ThisulaLewhan",
      handle: "ThisulaLewhan",
    },
  } satisfies Record<string, SocialLink>,

  skyradix: {
    name: "Skyradix",
    url: "https://www.skyradix.com",
    linkedin: "https://www.linkedin.com/company/skyradix/",
    instagram: "https://www.instagram.com/skyradix_",
    /** From skyradix.com. */
    tagline: "Rooted in innovation, skyward in possibilities.",
  },

  copyrightYear: 2026,
} as const;

export function mailto(address: string, subject?: string): string {
  if (!address) return "";
  return subject ? `mailto:${address}?subject=${encodeURIComponent(subject)}` : `mailto:${address}`;
}
