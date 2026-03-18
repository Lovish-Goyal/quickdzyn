"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDesigns } from "@/lib/api";
import SearchBar from "@/components/search-bar";

const filters = ["All", "Poster", "Banner", "Social Media", "Canva", "Figma"];

const gridVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.06 },
  },
};

export default function DesignsPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    setLoading(true);
    getDesigns()
      .then((data) => {
        if (Array.isArray(data)) setTemplates(data);
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeFilter === "All"
      ? templates
      : templates.filter((t) =>
          (t.categories || []).some((c: string) =>
            c.toLowerCase().includes(activeFilter.toLowerCase())
          )
        );

  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full overflow-hidden bg-white px-6 pt-16 pb-16 sm:pt-20 lg:pt-24 sm:pb-24">
        <div className="pointer-events-none absolute -top-24 left-6 h-64 w-64 rounded-full bg-primary/15 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 right-6 h-64 w-64 rounded-full bg-accent2/20 blur-[140px]" />
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                Design Library
              </p>
              <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
                Curated assets for fast-moving teams
              </h1>
              <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
                Explore premium posters, banners, and social kits crafted for Canva and Figma with production-ready specs.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-600">
                  Editable Layers
                </span>
                <span className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-600">
                  Brand-Safe Typography
                </span>
                <span className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-600">
                  Instant Download
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-primary/10 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.12)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Featured Pack</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Conversion-Ready Banners</h2>
              <p className="mt-3 text-sm text-slate-600">
                A cohesive banner system with high-contrast CTAs and export-ready files.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {["120+ Variants", "IAB Sizes", "Figma + Canva", "Layered Files"].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-100 bg-white/90 p-3 text-sm font-semibold text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-8 relative z-10 w-full max-w-2xl">
            <SearchBar placeholder="Search collection templates, banners, and more..." />
          </div>

          {/* Filter pills */}
          <div className="mt-6 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                type="button"
                whileHover={{ y: -2 }}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  activeFilter === filter
                    ? "bg-primary text-white shadow-[0_4px_20px_rgba(99,91,255,0.3)]"
                    : "border border-slate-200 bg-white/90 text-slate-700 hover:border-primary/60 hover:text-slate-900"
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[320px] animate-pulse rounded-3xl border border-slate-200 bg-white/90"
                />
              ))
            ) : (
              filtered.map((template) => (
                <motion.div
                  key={template._id || template.slug || template.title}
                  variants={gridVariants}
                  whileHover={{ y: -6 }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_48px_rgba(15,23,42,0.12)] transition-shadow"
                >
                  <Link href={`/designs/${template.slug || template._id}`} className="flex h-full flex-col">
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                      <img
                        src={template.images?.[0] || template.image}
                        alt={template.title}
                        className="h-full w-full object-contain bg-slate-50 transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-5">
                        <span className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-lg">
                          Preview
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5 bg-white relative">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-[16px] font-semibold text-slate-900 line-clamp-1">{template.title}</h2>
                        <span className="text-sm font-bold text-primary shrink-0">{template.price}</span>
                      </div>
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {template.description || "Includes editable layers, export-ready assets, and brand-safe typography."}
                      </p>
                      <div className="mt-auto flex items-center gap-2 pt-2">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                          {(template.categories || [])[0] || "Design"}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
