import type { Metadata } from "next";

const FALLBACK_BASE_URL = "https://quickdzyn.com";

export const SITE_NAME = "QuickDzyn";
export const SITE_TAGLINE = "Premium design templates, UI kits, and marketing graphics.";
export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : FALLBACK_BASE_URL;

export const metadataBase = new URL(BASE_URL || FALLBACK_BASE_URL);

export const absoluteUrl = (path = "/") => {
  try {
    return new URL(path, metadataBase).toString();
  } catch {
    return `${FALLBACK_BASE_URL}${path}`;
  }
};

export const defaultMetadata: Metadata = {
  metadataBase,
  title: {
    default: `${SITE_NAME} — Premium design marketplace`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  applicationName: SITE_NAME,
  keywords: [
    "QuickDzyn",
    "design templates",
    "Figma UI kits",
    "posters",
    "banners",
    "presentation templates",
    "social media graphics",
    "digital assets marketplace",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: absoluteUrl("/"),
    title: `${SITE_NAME} — Premium design marketplace`,
    description: SITE_TAGLINE,
    images: [
      {
        url: absoluteUrl("/og-default.svg"),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} hero image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@quickdzyn",
    creator: "@quickdzyn",
    title: `${SITE_NAME} — Premium design marketplace`,
    description: SITE_TAGLINE,
    images: [absoluteUrl("/og-default.svg")],
  },
  creator: SITE_NAME,
  publisher: SITE_NAME,
};

export const organizationLdJson = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/icon.svg"),
  sameAs: [
    "https://www.linkedin.com/company/quickdzyn",
    "https://www.instagram.com/quickdzyn",
  ],
  description: SITE_TAGLINE,
};
