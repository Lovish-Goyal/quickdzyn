import type { Metadata } from "next";
import { getBlogs, getDesigns } from "@/lib/api";
import { absoluteUrl } from "@/lib/seo";
import HomePageClient from "@/components/home-page";

export const revalidate = 900; // cache API responses for 15 minutes

export const metadata: Metadata = {
  title: "Quick design templates, UI kits, banners & social graphics",
  description:
    "Find premium Figma UI kits, marketing templates, posters, and social graphics. Download instantly with commercial rights from QuickDzyn.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Quick design templates, UI kits, banners & social graphics",
    description:
      "Download thousands of production-ready assets for web, mobile, pitch decks, and campaigns.",
    url: absoluteUrl("/"),
  },
  twitter: {
    title: "QuickDzyn — premium design marketplace",
    description:
      "UI kits, web templates, posters, banners, and social graphics ready to ship.",
  },
};

export default async function HomePage() {
  const [designs, blogs] = await Promise.all([
    getDesigns().catch(() => []),
    getBlogs().catch(() => []),
  ]);

  return (
    <HomePageClient
      designs={Array.isArray(designs) ? designs : []}
      blogs={Array.isArray(blogs) ? blogs.slice(0, 6) : []}
    />
  );
}
