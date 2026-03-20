import type { MetadataRoute } from "next";
import { getBlogs, getDesigns } from "@/lib/api";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600; // regenerate sitemap hourly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      priority: 1,
      changeFrequency: "daily",
      lastModified: new Date(),
    },
    absoluteUrl("/designs"),
    absoluteUrl("/blog"),
    absoluteUrl("/about"),
    absoluteUrl("/pricing"),
    absoluteUrl("/contact"),
    absoluteUrl("/terms"),
    absoluteUrl("/privacy"),
  ].map((entry) =>
    typeof entry === "string"
      ? { url: entry, changeFrequency: "weekly", lastModified: new Date() }
      : entry
  );

  try {
    const [designs, blogs] = await Promise.all([getDesigns(), getBlogs()]);

    if (Array.isArray(designs)) {
      designs.forEach((d: any) => {
        const slug = d.slug || d._id;
        if (!slug) return;
        urls.push({
          url: absoluteUrl(`/designs/${slug}`),
          changeFrequency: "weekly",
          lastModified: d.updatedAt ? new Date(d.updatedAt) : new Date(),
          priority: 0.7,
        });
      });
    }

    if (Array.isArray(blogs)) {
      blogs.forEach((b: any) => {
        if (!b.slug) return;
        urls.push({
          url: absoluteUrl(`/blog/${b.slug}`),
          changeFrequency: "weekly",
          lastModified: b.date ? new Date(b.date) : new Date(),
          priority: 0.6,
        });
      });
    }
  } catch (err) {
    // swallow errors to keep sitemap generation resilient
  }

  return urls;
}
