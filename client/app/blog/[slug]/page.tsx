import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "@/components/blog-post-client";
import { getBlog } from "@/lib/api";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

export const revalidate = 900;

async function fetchPost(slug: string) {
  const post = await getBlog(slug).catch(() => null);
  if (!post) return null;
  return post as any;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await fetchPost(params.slug);
  if (!post) {
    return {
      title: "Post not found",
      description: "The article you are looking for is unavailable.",
      alternates: { canonical: absoluteUrl(`/blog/${params.slug}`) },
    };
  }

  const title = `${post.title} | ${SITE_NAME} blog`;
  const description = post.summary || "Insights on design systems, branding, and UI kits.";
  const image = post.image;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/blog/${params.slug}`) },
    openGraph: {
      type: "article",
      title,
      description,
      url: absoluteUrl(`/blog/${params.slug}`),
      images: image ? [{ url: absoluteUrl(image) }] : undefined,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [absoluteUrl(image)] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}
