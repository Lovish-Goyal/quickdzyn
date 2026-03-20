"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogPostClient({ post }: { post: any }) {
  return (
    <main className="min-h-screen bg-white">
      <section className="w-full bg-gradient-to-b from-accent2/10 via-white to-white px-6 pt-16 pb-16 sm:pt-20 lg:pt-24">
        <div className="mx-auto w-full max-w-[1200px]">
          <Link
            href="/blog"
            className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            &lt;- Back to blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 space-y-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{post.date}</p>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{post.title}</h1>
            <p className="text-lg text-slate-600">{post.summary}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          >
            <div className="aspect-[16/9] bg-slate-100">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
            </div>
          </motion.div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-slate-700">
            {post.content?.map((block: any) => {
              if (block.type === "heading") {
                return (
                  <h2 key={block.text} className="text-2xl font-semibold text-slate-900">
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "list") {
                return (
                  <ul key={block.items.join("-")} className="space-y-3">
                    {block.items.map((item: string) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-white shadow-[0_0_15px_rgba(99,91,255,0.35)]">
                          check
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return <p key={block.text}>{block.text}</p>;
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
