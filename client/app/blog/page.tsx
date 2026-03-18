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
    <main className="min-h-screen bg-white">
      <section className="w-full bg-gradient-to-b from-primary/10 via-white to-white px-6 pt-16 pb-16 sm:pt-20 lg:pt-24 sm:pb-24">
        <div className="mx-auto w-full max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Blog</p>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Insights, workflows, and template strategy
            </h1>
            <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
              Practical guidance for shipping consistent visuals faster with Figma and Canva templates.
            </p>
          </motion.div>

          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
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
