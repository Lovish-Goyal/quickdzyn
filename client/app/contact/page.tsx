"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email Us",
    value: "hello@quickdzyn.com",
    sub: "We reply within 24 hours",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: "Call Us",
    value: "+91 - 0123456789",
    sub: "Mon – Fri, 9am – 6pm IST",
    iconBg: "bg-violet-500/10 text-violet-500",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Visit Us",
    value: "QuickDzyn Studio",
    sub: "Ambala Cantt, Haryana, PIN 133001, India",
    iconBg: "bg-emerald-500/10 text-emerald-600",
  },
];

const faqs = [
  {
    q: "How do I download purchased files?",
    a: "After completing your purchase, you'll receive an email with a download link. You can also access all your purchases from your account dashboard under 'My Downloads'.",
  },
  {
    q: "Can I use assets in commercial projects?",
    a: "Yes! Every asset on QuickDzyn comes with a full commercial license, allowing you to use it in client work, SaaS products, and any commercial projects.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer refunds within 7 days of purchase if you haven't downloaded the files. For technical issues, please reach out to our support team first.",
  },
  {
    q: "How to request a custom design?",
    a: "Use the contact form on this page and mention 'Custom Design Request' in the subject. Our team will get back to you within 24 hours with a quote.",
  },
  {
    q: "What file formats are included?",
    a: "Depending on the asset, files may include Figma, Sketch, Adobe XD, PSD, AI, and PDF formats. Each product listing clearly states which formats are included.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-semibold text-slate-800">{q}</span>
        <span
          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform duration-200 ${open ? "rotate-45" : ""
            }`}
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-slate-500 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [query, setQuery] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => setSent(false), 5000);
      setName("");
      setEmail("");
      setSubject("");
      setQuery("");
    }, 1200);
  }

  return (
    <main className="min-h-screen bg-white">

      {/* ── Page Header ──────────────────────────────────────────── */}
      <section className="w-full border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white px-6 pt-16 pb-16 sm:pt-20 lg:pt-24">
        <div className="mx-auto w-full max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              Support
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              How can we help you?
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-500 leading-relaxed">
              Have a question about designs, pricing, or custom work? Drop us a message — we typically respond within 24 hours.
            </p>
          </motion.div>

          {/* Contact info strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
              >
                <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${info.iconBg}`}>
                  {info.icon}
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{info.label}</p>
                  <p className="text-sm font-semibold text-slate-800">{info.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Main Grid ────────────────────────────────────────────── */}
      <section className="w-full px-6 py-14">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">

            {/* ── Contact Form ───────────────────────────────────── */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_4px_40px_rgba(0,0,0,0.05)] space-y-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Send a Message</h2>
                <p className="mt-1.5 text-sm text-slate-400">
                  Fill in the form below and we&apos;ll respond within 24 hours.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 placeholder:text-slate-400"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Custom design request"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Your Message
                </label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tell us about your project or question..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 placeholder:text-slate-400 resize-none"
                  rows={5}
                  required
                />
              </div>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <p className="text-sm font-semibold text-emerald-700">
                      Message sent! We&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,91,255,0.25)] transition hover:bg-primary/90 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </motion.form>

            {/* ── Right Column ─────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-5"
            >
              {/* Contact Detail Cards */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_4px_40px_rgba(0,0,0,0.05)] space-y-3">
                <h3 className="text-sm font-semibold text-slate-900">Contact Details</h3>
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-slate-200 hover:bg-white"
                  >
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${info.iconBg}`}>
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{info.label}</p>
                      <p className="mt-0.5 text-sm font-semibold text-slate-800">{info.value}</p>
                      <p className="text-xs text-slate-400">{info.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_4px_40px_rgba(0,0,0,0.05)]">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Find us on social</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Twitter / X", href: "#" },
                    { name: "Instagram", href: "#" },
                    { name: "LinkedIn", href: "#" },
                    { name: "Dribbble", href: "#" },
                  ].map((s) => (
                    <Link
                      key={s.name}
                      href={s.href}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-primary/40 hover:bg-white hover:text-primary"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_4px_40px_rgba(0,0,0,0.05)]">
                <h3 className="text-sm font-semibold text-slate-900">Frequently Asked Questions</h3>
                <p className="mt-1 text-xs text-slate-400 mb-4">Quick answers to common questions</p>
                <div className="divide-y divide-slate-100">
                  {faqs.map((faq) => (
                    <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
