"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import DesignOrderModal from "@/components/design-order-modal";

export default function DesignDetailClient({ design }: { design: any }) {
  const images = design?.images && design.images.length > 0 ? design.images : [design?.image];

  return (
    <main className="min-h-screen bg-white">
      <section className="w-full bg-gradient-to-b from-accent2/10 via-white to-white px-6 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1400px]">
          <Link
            href="/designs"
            className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            &lt;- Back to designs
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <div className="aspect-[4/3] bg-slate-100">
                  <img src={images[0]} alt={design.title} className="h-full w-full object-cover" />
                </div>
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-3 gap-3">
                  {images.slice(1).map((img, idx) => (
                    <div key={img} className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90">
                      <img src={img} alt={`${design.title} ${idx + 2}`} className="h-24 w-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-slate-900">What you get</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {design.features?.map((feature: string) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-white shadow-[0_0_20px_rgba(99,91,255,0.35)]">
                        check
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            >
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Template</p>
                <h1 className="text-3xl font-semibold text-slate-900">{design.title}</h1>
                <p className="text-base text-slate-600">{design.description}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Price</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{design.price}</p>
                <p className="mt-1 text-xs text-slate-500">Includes lifetime updates and usage rights.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <DesignOrderModal title={design.title} price={design.price} />
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-primary/60 hover:shadow-[0_0_20px_rgba(99,91,255,0.25)] sm:w-auto"
                >
                  Ask a question
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-xs text-slate-500">
                Need a custom variant? We can tailor colors, layouts, and formats within 24 hours.
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
