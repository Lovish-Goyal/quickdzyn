"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getContent } from "@/lib/api";

const fallback = {
  title: "Terms & Conditions",
  body: [
    "These Terms & Conditions govern your use of QuickDzyn. By accessing, browsing, or purchasing from our platform, you agree to these terms in full.",
    "QuickDzyn provides digital templates, design kits, and related services that are delivered electronically. No physical goods are shipped.",
    "Templates are licensed for personal or commercial use unless otherwise stated. You may not resell, redistribute, or claim the designs as your own.",
    "Payments are processed upon confirmation. Delivery timelines vary by plan and will be communicated at checkout or via support.",
    "We aim to respond to support requests within 24 hours. Revision limits depend on the plan selected.",
    "QuickDzyn is not liable for indirect or consequential damages arising from use of templates or services.",
    "We may update these terms periodically. The latest version will always be posted on this page.",
    "By using QuickDzyn, you confirm that you are legally able to enter into a binding agreement in your jurisdiction.",
    "If you do not agree to these terms, please discontinue use of our services.",
  ],
};

const sections = [
  {
    title: "License & Usage",
    points: [
      "You can use templates for client work and internal projects.",
      "You cannot resell templates in their original or modified form.",
      "You cannot claim authorship of the original layout systems.",
      "You must not remove attribution notes included in files when applicable.",
    ],
  },
  {
    title: "Payments & Invoices",
    points: [
      "Payments are required before delivery.",
      "All pricing is listed in INR unless stated otherwise.",
      "Refunds are handled on a case-by-case basis for unused assets.",
      "Invoices are issued digitally upon request.",
    ],
  },
  {
    title: "Support & Revisions",
    points: [
      "Support is provided via email or WhatsApp.",
      "Response times depend on your selected plan and request complexity.",
      "Revision limits are defined in your plan summary.",
      "Custom work timelines are agreed before production begins.",
    ],
  },
  {
    title: "Prohibited Use",
    points: [
      "Do not use templates for illegal or misleading purposes.",
      "Do not use assets in a way that violates third-party rights.",
      "Do not reverse engineer or resell templates as a competing product.",
    ],
  },
];

const clauses = [
  {
    title: "Account access",
    body:
      "You are responsible for maintaining the confidentiality of any account or download links provided to you. If you suspect unauthorized access, notify us immediately so we can secure your files.",
  },
  {
    title: "Delivery",
    body:
      "Digital assets are delivered via email or a secure download link. Delivery times vary based on plan and queue volume, but most orders are fulfilled within 24 hours of confirmation.",
  },
  {
    title: "Intellectual property",
    body:
      "All templates, design systems, and supporting files remain the intellectual property of QuickDzyn. You receive a license to use the assets, not ownership of the underlying design system.",
  },
  {
    title: "Refunds",
    body:
      "Because digital files are delivered instantly, refunds are generally limited. If a file is unusable or materially different from the description, contact us within 7 days and we will review your request.",
  },
  {
    title: "Liability",
    body:
      "QuickDzyn is not responsible for indirect, incidental, or consequential damages. Our maximum liability is limited to the amount you paid for the specific product or service.",
  },
  {
    title: "Termination",
    body:
      "We may suspend access if these terms are violated. Upon termination, your license to use the templates immediately ends and you must delete all files from your systems.",
  },
  {
    title: "Governing law",
    body:
      "These terms are governed by the laws applicable in India. Any disputes shall be resolved in the courts of the jurisdiction where QuickDzyn is registered.",
  },
  {
    title: "Updates",
    body:
      "We may revise these terms at any time. Continued use of our services after changes become effective constitutes acceptance of the revised terms.",
  },
];

interface Content {
  title: string;
  body: string[];
}

export default function TermsPage() {
  const [content, setContent] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getContent<Content>("terms")
      .then((data) => data && data.title && setContent(data))
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <section className="w-full bg-gradient-to-b from-primary/10 via-white to-white px-6 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1400px] space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Legal</p>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              {loading ? "Loading terms..." : content.title}
            </h1>
            <p className="text-sm text-slate-500">Last updated: March 14, 2026</p>
          </motion.div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-sm text-slate-600 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, idx) => (
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

          <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-primary/10 via-white to-accent2/10 p-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
            <h2 className="text-xl font-semibold text-slate-900">Detailed terms</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {clauses.map((clause) => (
                <div key={clause.title} className="rounded-2xl border border-slate-200 bg-white/95 p-5">
                  <p className="text-sm font-semibold text-slate-900">{clause.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{clause.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
            <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
            <p className="mt-3 text-sm text-slate-600">
              For questions about these terms, reach out to our support team at support@quickdzyn.com or through
              WhatsApp. We aim to respond within one business day.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}


