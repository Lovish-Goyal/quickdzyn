"use client";

import { motion } from "framer-motion";

const aboutSections = [
  {
    title: "Our Mission",
    points: [
      "To provide high-quality, production-ready design templates.",
      "To save designers and marketers thousands of hours in production.",
      "To ensure every asset is built with developer handoff in mind.",
      "To democratize access to premium UI/UX structures.",
    ],
  },
  {
    title: "Our Philosophy",
    points: [
      "Design should be functional before it is decorative.",
      "Layers should be organized, named, and grouped logically.",
      "Global styles and tokens are mandatory, not optional.",
      "Accessibility is a core component, not an afterthought.",
    ],
  },
];

const teamClauses = [
  {
    title: "Expertise",
    body:
      "Our core team consists of senior product designers and marketing art directors who have worked with Fortune 500 companies. We channel this enterprise-level experience into every template we release.",
  },
  {
    title: "Quality Assurance",
    body:
      "Every template goes through a rigorous QA process. We check for contrast ratios, responsive behavior in Figma auto-layout, and print-safe margins for all poster/banner CMYK files.",
  },
  {
    title: "Community Driven",
    body:
      "We listen to our users. A significant portion of our roadmap is dictated by the specific requests and pain points highlighted by our community of over 50,000 creators.",
  },
  {
    title: "Continuous Updates",
    body:
      "Design trends evolve, and so do our templates. When you purchase from QuickDzyn, you receive lifetime updates for that specific asset, ensuring your designs never feel dated.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="w-full bg-white px-6 pt-16 pb-16 sm:pt-20 lg:pt-24 sm:pb-24">
        <div className="mx-auto w-full max-w-[1400px] space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">About Us</p>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">We build the foundation so you can build the future.</h1>
            <p className="text-sm text-slate-500">Established 2026</p>
          </motion.div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-sm text-slate-600 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
            <p className="mb-4">
              QuickDzyn started with a simple realization: designers spend too much time recreating the same structural foundations for every new project. Whether it's setting up a SaaS dashboard grid, establishing typography scales, or ensuring proper padding across social media carousels—the setup phase is tedious.
            </p>
            <p className="mb-4">
              We decided to solve this by creating an exhaustive library of "invisible design." We provide the robust layouts, the meticulously organized layers, and the mathematically perfect grids. You provide the brand soul.
            </p>
            <p>
              Today, QuickDzyn powers thousands of freelancers, agencies, and in-house teams, allowing them to skip the wireframing phase and jump straight into high-fidelity, creative execution.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {aboutSections.map((section) => (
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
            <h2 className="text-xl font-semibold text-slate-900">How we work</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {teamClauses.map((clause) => (
                <div key={clause.title} className="rounded-2xl border border-slate-200 bg-white/95 p-5">
                  <p className="text-sm font-semibold text-slate-900">{clause.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{clause.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
            <h2 className="text-xl font-semibold text-slate-900">Join the team</h2>
            <p className="mt-3 text-sm text-slate-600">
              We are always looking for talented designers to contribute to our marketplace. If you have an eye for detail and a passion for structural design, email your portfolio to careers@quickdzyn.com.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
