"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPricing } from "@/lib/api";

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
    <main className="min-h-screen bg-white">
      <section className="w-full bg-gradient-to-b from-primary/10 via-white to-white px-6 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Pricing
            </p>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Choose the plan that fits your workflow
            </h1>
            <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
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
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
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
                        <li key={feature} className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-white">
                            check
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,91,255,0.25)] transition hover:bg-primary/90"
                    >
                      Order Now
                    </motion.button>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>
    </main>
  );
}
