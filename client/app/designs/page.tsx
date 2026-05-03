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
            className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[320px] animate-pulse rounded-3xl border border-slate-200 bg-white"
                />
              ))
            ) : (
              filtered.map((template) => (
                <motion.div
                  key={template._id || template.slug || template.title}
                  variants={gridVariants}
                  whileHover={{ y: -6 }}
                  className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.1)] transition-all relative"
                >
                  <Link href={`/designs/${template.slug || template._id}`} className="flex h-full flex-col">
                    <div className="aspect-[4/3] overflow-hidden bg-slate-50 relative p-4">
                      {/* Rating Badge */}
                      <div className="absolute top-4 left-4 z-20 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-900 shadow-md backdrop-blur-sm">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFC700" stroke="#FFC700"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        4.8
                      </div>
                      
                      {/* Favorite Button */}
                      <button 
                        type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-md backdrop-blur-sm hover:text-red-500 hover:scale-110 transition duration-200"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                      </button>

                      <img
                        src={template.images?.[0] || template.image}
                        alt={template.title}
                        className="h-full w-full object-contain bg-white transition-transform duration-500 ease-out group-hover:scale-105 rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-5">
                        <span className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                          Preview Details
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6 bg-white relative">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <h2 className="text-[17px] font-bold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">{template.title}</h2>
                          <span className="text-sm font-extrabold text-primary shrink-0">{template.price ? (template.price.includes("₹") ? template.price : template.price.includes("$") ? template.price.replace("$", "₹") : `₹${template.price}`) : "₹0"}</span>
                        </div>
                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                          {template.description || "Includes editable layers, export-ready assets, and brand-safe typography."}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                        <span className="text-xs font-semibold text-slate-400">
                          {template.images?.length || 1} files included
                        </span>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
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
