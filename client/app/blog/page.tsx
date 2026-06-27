"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getBlogs } from "@/lib/api";

const listVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
  },
};

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBlogs()
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -top-12 right-1/4 h-80 w-80 rounded-full bg-accent2/10 blur-[120px]" />

      <section className="w-full bg-gradient-to-b from-slate-50/50 via-white to-white px-6 pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20">
        <div className="mx-auto w-full max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto mb-10"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              QuickDzyn Blog
            </span>

            <h1 className="pb-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950">
              Insights, workflows, and template strategy
            </h1>

            <p className="max-w-4xl text-base text-slate-600 sm:text-lg leading-relaxed">
              Practical guidance for shipping consistent visuals faster with Figma and Canva templates.
            </p>
          </motion.div>

          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[320px] animate-pulse rounded-3xl border border-slate-200 bg-white/90"
                  />
                ))
              : posts.map((post) => (
                  <motion.article
                    key={post.slug}
                    variants={listVariants}
                    whileHover={{ y: -6 }}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl"
                  >
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                          {post.date}
                        </p>
                        <h2 className="mt-3 text-lg font-semibold text-slate-900">{post.title}</h2>
                        <p className="mt-2 text-sm text-slate-600">{post.summary}</p>
                      </div>
                    </Link>
                  </motion.article>
                ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
