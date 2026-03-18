"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getContent } from "@/lib/api";

const fallback = {
  title: "Privacy Policy",
  body: [],
};

const sections = [
  {
    title: "Data we collect",
    points: [
      "Name, email, and contact details submitted in forms",
      "Payment confirmation details (UPI, invoices)",
      "Basic usage analytics to improve performance",
      "Order history and design preferences",
    ],
  },
  {
    title: "How we use data",
    points: [
      "To deliver templates and assets",
      "To provide support and updates",
      "To improve template quality and catalog",
      "To personalize recommendations and offers",
    ],
  },
  {
    title: "Your rights",
    points: [
      "Request access or deletion of your data",
      "Opt out of marketing messages",
      "Update contact details or billing records",
      "Ask for a copy of your stored information",
    ],
  },
  {
    title: "Security",
    points: [
      "We use access controls and limited permissions",
      "Data is stored securely with reputable providers",
      "We review our systems regularly for vulnerabilities",
    ],
  },
];

const details = [
  {
    title: "Cookies",
    body:
      "We may use cookies or similar technologies to remember preferences, measure performance, and understand which templates are most useful. You can disable cookies in your browser settings, but some features may not function properly.",
  },
  {
    title: "Third-party tools",
    body:
      "We rely on trusted services for payments, analytics, and customer support. These providers process data on our behalf and are required to protect it according to their own policies and agreements with us.",
  },
  {
    title: "Data retention",
    body:
      "We keep your information only as long as needed to deliver services, comply with legal obligations, and resolve disputes. You can request deletion at any time, subject to legal requirements.",
  },
  {
    title: "Children's privacy",
    body:
      "QuickDzyn is not intended for children under 13. We do not knowingly collect data from minors. If you believe a child has provided us with data, please contact us for removal.",
  },
  {
    title: "International transfers",
    body:
      "If you access QuickDzyn from outside India, your information may be transferred to and processed in India or other locations where our providers operate.",
  },
];

interface Content {
  title: string;
  body: string[];
}

export default function PrivacyPage() {
  const [content, setContent] = useState<any>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getContent<Content>("privacy")
      .then((data) => {
        if (data && data.title) setContent(data);
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <section className="w-full bg-gradient-to-b from-accent2/10 via-white to-white px-6 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1400px] space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Legal</p>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{content.title}</h1>
            <p className="text-sm text-slate-500">Last updated: March 14, 2026</p>
          </motion.div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-sm text-slate-600 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="h-4 w-full animate-pulse rounded bg-slate-200" />
                ))}
              </div>
            ) : (
              content.body.map((line: string) => (
                <p key={line} className="mb-4 last:mb-0">
                  {line}
                </p>
              ))
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_15px_30px_rgba(15,23,42,0.08)]"
              >
                <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-primary">-</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-primary/10 via-white to-accent/10 p-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
            <h2 className="text-xl font-semibold text-slate-900">More privacy details</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {details.map((detail) => (
                <div key={detail.title} className="rounded-2xl border border-slate-200 bg-white/95 p-5">
                  <p className="text-sm font-semibold text-slate-900">{detail.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{detail.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
            <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
            <p className="mt-3 text-sm text-slate-600">
              If you have any privacy questions or requests, email support@quickdzyn.com. We respond within one
              business day and will work with you on access or deletion requests.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}


