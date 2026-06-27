"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPricing } from "@/lib/api";
import DesignOrderModal from "@/components/design-order-modal";

export default function PricingPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPricing()
      .then((data) => {
        if (Array.isArray(data)) setPlans(data);
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
              Pricing Plans
            </span>

            <h1 className="pb-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950">
              Choose the plan that fits your workflow
            </h1>

            <p className="max-w-4xl text-base text-slate-600 sm:text-lg leading-relaxed">
              Professional templates for every stage of your brand. Upgrade anytime as your content needs grow.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-80 animate-pulse rounded-3xl border border-slate-200 bg-white/90"
                  />
                ))
              : plans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl"
                  >
                    {plan.highlight ? (
                      <span className="absolute right-6 top-6 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        Most popular
                      </span>
                    ) : null}
                    <h2 className="text-xl font-semibold text-slate-900">{plan.name}</h2>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">{plan.price ? (plan.price.includes("₹") ? plan.price : plan.price.includes("$") ? plan.price.replace("$", "₹") : `₹${plan.price}`) : "₹0"}</p>
                    <p className="mt-3 text-sm text-slate-600">{plan.description}</p>
                    <ul className="mt-6 space-y-3 text-sm text-slate-600">
                      {plan.features.map((feature: string) => (
                        <li key={feature} className="flex items-center gap-3">
                          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.5 4L3.83333 6.33333L8.5 1.66667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <DesignOrderModal
                      title={`${plan.name} Plan`}
                      price={plan.price}
                      buttonClassName="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,91,255,0.25)] transition hover:bg-primary/90"
                    />
                  </motion.div>
                ))}
          </div>
        </div>
      </section>
    </main>
  );
}
