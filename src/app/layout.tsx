import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { themeInitScript } from "@/components/ThemeToggle";
import { profile } from "@/content/profile";
import { ogImage } from "@/lib/seo";
import { personJsonLd } from "@/lib/structured-data";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const title = `${profile.name} · Computational chemistry research`;
const description = `${profile.tagline} Researcher at the ${profile.department}, ${profile.institution}, ${profile.country}.`;

export const metadata: Metadata = {
  // Trailing slash keeps a GitHub Pages base path (e.g. /repo) when resolving relative URLs.
  metadataBase: new URL(`${siteUrl}/`),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.orcid.href }],
  keywords: [
    profile.name,
    "computational chemistry",
    "density functional theory",
    "molecular docking",
    "molecular dynamics",
    "drug design",
    "COX-2",
    "antimicrobial",
    "perovskite solar cells",
    "University of Chittagong",
  ],
  alternates: { canonical: "./" },
  openGraph: {
    type: "profile",
    firstName: "Niloy",
    lastName: "Bhattacharjee",
    title,
    description,
    siteName: profile.name,
    locale: "en_GB",
    url: "./",
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a1628" },
    { media: "(prefers-color-scheme: dark)", color: "#060e1c" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd data={personJsonLd()} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader name={profile.name} initials={profile.initials} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
