"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogPostClient({ post }: { post: any }) {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -top-12 right-1/4 h-80 w-80 rounded-full bg-accent2/10 blur-[120px]" />

      <section className="w-full bg-gradient-to-b from-slate-50/50 via-white to-white px-6 pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20">
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
                        <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 4L3.83333 6.33333L8.5 1.66667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
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
