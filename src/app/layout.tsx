import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Instrument_Sans } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const shoulders = Big_Shoulders({
  variable: "--font-shoulders",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url), alternates: { canonical: "/" } } : {}),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "profile",
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: "en_GB",
    firstName: site.firstName,
    lastName: site.lastName,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#08090c",
  colorScheme: "dark",
};

/** Plays the opening sequence once per session, and never with reduced motion. */
const introScript = `try{var k="tl-intro";if(!sessionStorage.getItem(k)&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("intro")}sessionStorage.setItem(k,"1")}catch(e){}`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  ...(site.url ? { url: site.url } : {}),
  jobTitle: "Founder",
  worksFor: { "@type": "Organization", name: site.skyradix.name, url: site.skyradix.url },
  affiliation: { "@type": "CollegeOrUniversity", name: "Sri Lanka Institute of Information Technology" },
  address: { "@type": "PostalAddress", addressLocality: "Colombo", addressCountry: "LK" },
  sameAs: [site.social.linkedin.href, site.social.instagram.href, site.social.github.href],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The intro script may add a class to <html> before hydration.
    <html
      lang="en"
      className={`${shoulders.variable} ${instrument.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          // Static, trusted content from site config.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
