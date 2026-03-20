import type { MetadataRoute } from "next";
import { getBlogs, getDesigns } from "@/lib/api";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600; // regenerate sitemap hourly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Pages define karein
  const staticPages = [
    "/",
    "/designs",
    "/blog",
    "/about",
    "/pricing",
    "/contact",
    "/terms",
    "/privacy",
  ];

  const staticUrls: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: absoluteUrl(page),
    lastModified: new Date(),
    changeFrequency: page === "/" ? ("daily" as const) : ("weekly" as const),
    priority: page === "/" ? 1 : 0.8,
  }));

  const dynamicUrls: MetadataRoute.Sitemap = [];

  try {
    const [designs, blogs] = await Promise.all([getDesigns(), getBlogs()]);

    if (Array.isArray(designs)) {
      designs.forEach((d: any) => {
        const slug = d.slug || d._id;
        if (slug) {
          dynamicUrls.push({
            url: absoluteUrl(`/designs/${slug}`),
            changeFrequency: "weekly" as const,
            lastModified: d.updatedAt ? new Date(d.updatedAt) : new Date(),
            priority: 0.7,
          });
        }
      });
    }

    if (Array.isArray(blogs)) {
      blogs.forEach((b: any) => {
        if (b.slug) {
          dynamicUrls.push({
            url: absoluteUrl(`/blog/${b.slug}`),
            changeFrequency: "weekly" as const,
            lastModified: b.date ? new Date(b.date) : new Date(),
            priority: 0.6,
          });
        }
      });
    }
  } catch (err) {
    console.error("Sitemap generation error:", err);
  }

  return [...staticUrls, ...dynamicUrls];
}
