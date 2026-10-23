import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
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
  themeColor: "#f3f1ec",
  colorScheme: "light",
};

/** Marks the page as scripted, so reveal animations only hide content when JS can show it again. */
const jsFlag = `document.documentElement.classList.add("js")`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  ...(site.url ? { url: site.url } : {}),
  jobTitle: "Founder",
  worksFor: { "@type": "Organization", name: "Skyradix", url: site.links.skyradix },
  address: { "@type": "PostalAddress", addressLocality: "Colombo", addressCountry: "LK" },
  sameAs: [site.links.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The inline script adds a class to <html> before hydration.
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable}`}
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
