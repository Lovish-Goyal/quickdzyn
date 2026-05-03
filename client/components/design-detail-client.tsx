"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import DesignOrderModal from "@/components/design-order-modal";

export default function DesignDetailClient({ design }: { design: any }) {
  const images = design?.images && design.images.length > 0 ? design.images : [design?.image];
  const formattedPrice = design.price ? (design.price.includes("₹") ? design.price : design.price.includes("$") ? design.price.replace("$", "₹") : `₹${design.price}`) : "₹0";

  const isFigmaUIKits = (design?.categories || []).some((cat: string) =>
    ["figma", "ui kits", "ui kit"].includes(cat.toLowerCase().trim())
  );

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      {/* Upper Navigation and Header */}
      <section className="w-full px-6 pt-12 sm:pt-16">
        <div className="mx-auto w-full max-w-[1300px] space-y-5">
          <Link
            href="/designs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to designs
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{design.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1 font-bold text-slate-900">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFC700" stroke="#FFC700"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  4.8
                </div>
                <span className="underline font-medium hover:text-primary cursor-pointer">44 reviews</span>
                <span className="text-slate-300">•</span>
                <span className="font-semibold text-primary">{(design.categories || [])[0] || "Design"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600 font-semibold self-start md:self-center">
              <button className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 transition hover:bg-slate-50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                Share
              </button>
              <button className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 transition hover:bg-slate-50 hover:text-red-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                Save
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery & Layout */}
      <section className="w-full px-6 pt-6">
        <div className="mx-auto w-full max-w-[1300px]">
          {isFigmaUIKits ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="aspect-[4/3] md:aspect-auto md:h-[420px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative group">
                <img src={images[0]} alt={design.title} className="h-full w-full object-contain bg-white transition duration-500 group-hover:scale-105" />
              </div>

              {/* Smaller thumbnails stacked */}
              <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-4 h-[420px]">
                {Array.from({ length: 4 }).map((_, idx) => {
                  const img = images[idx + 1] || images[0];
                  return (
                    <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 group relative">
                      <img src={img} alt={`${design.title} ${idx + 2}`} className="h-full w-full object-contain bg-white transition duration-500 group-hover:scale-105" />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="aspect-[16/9] max-h-[500px] w-full rounded-2xl overflow-hidden border border-slate-200 bg-white relative group">
              <img src={images[0]} alt={design.title} className="h-full w-full object-contain bg-white transition duration-500 group-hover:scale-105" />
            </div>
          )}
        </div>
      </section>

      {/* Main Detailing Section */}
      <section className="w-full px-6 pt-10">
        <div className="mx-auto w-full max-w-[1300px] grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Description</h2>
              <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                {design.description || "Get instant download to high-quality design systems and production-ready visual resources. Includes clean vector layering, exportable variables, and lifetime asset updates."}
              </p>
            </div>

            {/* Features (What you get) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">What this template offers</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {(design.features && design.features.length > 0 ? design.features : ["Lifetime access & free updates", "Full commercial use license", "Organized layer architecture", "Export-ready variables"]).map((feat: string, i: number) => (
                  <div key={feat} className="flex items-center gap-3.5 text-sm text-slate-700 font-medium">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {feat}
                  </div>
                ))}
              </div>
            </div>


          </motion.div>

          {/* Pricing Breakout and Order Section */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.04)] space-y-6 lg:sticky lg:top-24"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-3xl font-extrabold text-slate-900">{formattedPrice}</span>
                <span className="text-sm font-medium text-slate-500"> / instant download</span>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold tracking-wider text-emerald-600 uppercase">Available Now</span>
            </div>

            {/* Price Detail Breakdown */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 space-y-3.5 text-sm text-slate-600">
              <div className="flex justify-between font-medium">
                <span>Base price</span>
                <span className="font-bold text-slate-900">{formattedPrice}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Royalty-free commercial license</span>
                <span className="font-bold text-slate-900">Included</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Lifetime support & asset updates</span>
                <span className="font-bold text-slate-900">Included</span>
              </div>
              <div className="border-t border-slate-200/60 pt-3 flex justify-between font-extrabold text-slate-900 text-base">
                <span>Total Due</span>
                <span>{formattedPrice}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <DesignOrderModal title={design.title} price={design.price} />
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Inquire about custom variant
              </Link>
            </div>

            <div className="text-center text-xs text-slate-400 font-medium">
              Payment is 100% secure. You will receive source files instantly.
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
