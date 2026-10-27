import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

// One italic serif voice, used only for the accent word in each heading.
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  title: site.title,
  description: site.description,
  keywords: ["Thisula Lewhan", "Skyradix", "entrepreneur", "founder", "Colombo", "Sri Lanka"],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "profile",
    url: "/",
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f1ec",
  colorScheme: "light",
};

/** Marks the page as scripted (so reveals only hide content JS can show again)
 *  and starts the scrollbar on the dark hero surface. */
const jsFlag = `document.documentElement.classList.add("js");document.documentElement.dataset.surface="dark"`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  givenName: site.firstName,
  familyName: site.lastName,
  url: `${site.url}/`,
  image: `${site.url}${site.portrait.src}`,
  description: site.description,
  jobTitle: "Founder",
  worksFor: { "@type": "Organization", name: "Skyradix", url: site.links.skyradix },
  address: { "@type": "PostalAddress", addressLocality: "Colombo", addressCountry: "LK" },
  sameAs: [site.links.linkedin, site.links.instagram, "https://github.com/ThisulaLewhan"].filter(Boolean),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The inline script adds a class to <html> before hydration.
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${instrumentSerif.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
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
