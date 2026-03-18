"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { getDesigns, getBlogs } from "@/lib/api";
import SearchBar from "@/components/search-bar";

/* ─── animation helpers ──────────────────────────────────────── */
const stagger = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
  },
};

/* ─── static content ─────────────────────────────────────────── */
const heroBadges = [
  "Figma Kits",
  "Posters",
  "UI Templates",
  "Social Graphics",
  "Banners",
  "Presentations",
];

const stats = [
  { label: "Premium Assets", value: "5,000+" },
  { label: "Active Creators", value: "350+" },
  { label: "Categories", value: "24+" },
  { label: "Happy Buyers", value: "10k+" },
];

const whyCards = [
  {
    icon: "⚡",
    title: "Instant Download",
    desc: "Purchase and download production-ready source files in seconds. No waiting.",
  },
  {
    icon: "🎯",
    title: "Pixel-Perfect Quality",
    desc: "Every asset is meticulously crafted with attention to detail and best practices.",
  },
  {
    icon: "🛡️",
    title: "Commercial License",
    desc: "Use in client work, SaaS products, and commercial projects with full rights.",
  },
  {
    icon: "🔄",
    title: "Lifetime Updates",
    desc: "Get free updates whenever assets are improved or expanded by creators.",
  },
  {
    icon: "🎨",
    title: "Multi-Format Files",
    desc: "Figma, Sketch, Canva, PSD, AI — we support all major design tools.",
  },
  {
    icon: "💬",
    title: "Creator Support",
    desc: "Direct communication with asset creators for custom requests and help.",
  },
];

/* ─── Drag-scroll Carousel ───────────────────────────────────── */
function Carousel({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!ref.current) return;
    setCanScrollLeft(ref.current.scrollLeft > 4);
    setCanScrollRight(
      ref.current.scrollLeft + ref.current.clientWidth < ref.current.scrollWidth - 4
    );
  };

  useEffect(() => {
    checkScroll();
    const el = ref.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
    };
  }, [children]);

  const scroll = (dir: number) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel">
      {canScrollLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg text-slate-700 opacity-0 group-hover/carousel:opacity-100 transition hover:bg-primary hover:text-white hover:border-primary"
        >
          ‹
        </button>
      )}
      <div
        ref={ref}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
      {canScrollRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg text-slate-700 opacity-0 group-hover/carousel:opacity-100 transition hover:bg-primary hover:text-white hover:border-primary"
        >
          ›
        </button>
      )}
    </div>
  );
}

/* ─── Multi-image Stacked Card ───────────────────────────────── */
function DesignCard({ design }: { design: any }) {
  const imgs = design.images?.length > 0 ? design.images : [design.image];
  const hasMulti = imgs.length > 1;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="min-w-[280px] max-w-[320px] flex-shrink-0 rounded-3xl border border-slate-200 bg-white shadow-md relative group cursor-pointer overflow-hidden"
    >
      <Link href={`/designs/${design.slug || design._id}`}>
        <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
          <img
            src={imgs[0]}
            alt={design.title}
            className="h-full w-full object-contain bg-slate-50 transition duration-500 group-hover:scale-110"
          />
          {/* Stacked mini-thumbnails in corner */}
          {hasMulti && (
            <div className="absolute top-3 right-3 flex -space-x-3">
              {imgs.slice(0, 3).map((img: string, i: number) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-lg border-2 border-white overflow-hidden shadow-sm"
                  style={{ zIndex: 10 - i }}
                >
                  <img src={img} alt="" className="h-full w-full object-contain bg-slate-50" />
                </div>
              ))}
              {imgs.length > 3 && (
                <div className="h-8 w-8 rounded-lg border-2 border-white bg-slate-900/80 flex items-center justify-center shadow-sm" style={{ zIndex: 7 }}>
                  <span className="text-[10px] font-bold text-white">+{imgs.length - 3}</span>
                </div>
              )}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white font-medium text-sm px-4 py-2 bg-primary rounded-full shadow-lg">
              Preview
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-[15px] font-semibold text-slate-900 line-clamp-1">{design.title}</h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-bold text-primary">{design.price}</span>
            <div className="flex items-center gap-1.5">
              {hasMulti && (
                <span className="text-[10px] font-bold text-slate-400">{imgs.length} files</span>
              )}
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                {(design.categories || [])[0] || "Design"}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Section Wrapper with inView ────────────────────────────── */
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Auto-cycling Hero Showcase ─────────────────────────────── */
function HeroShowcase({ designs }: { designs: any[] }) {
  const [active, setActive] = useState(0);
  const items = designs.slice(0, 5);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className="relative w-full rounded-[32px] overflow-hidden border border-slate-100 shadow-xl bg-white">
      {/* Main image with crossfade */}
      <div className="relative aspect-[4/3] bg-slate-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={items[active]?.image}
            src={items[active]?.image}
            alt={items[active]?.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 h-full w-full object-contain bg-slate-50"
          />
        </AnimatePresence>
        {/* Gradient overlay at bottom */}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 p-3 bg-white">
        {items.map((item: any, i: number) => (
          <button
            key={item._id || i}
            onClick={() => setActive(i)}
            className={`relative flex-1 h-14 rounded-xl overflow-hidden border-2 transition-all ${i === active
                ? "border-primary shadow-[0_0_12px_rgba(99,91,255,0.3)]"
                : "border-transparent opacity-60 hover:opacity-100"
              }`}
          >
            <img src={item.image} alt="" className="h-full w-full object-contain bg-slate-50" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [designs, setDesigns] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getDesigns(), getBlogs()])
      .then(([designData, blogData]) => {
        if (Array.isArray(designData)) setDesigns(designData);
        if (Array.isArray(blogData)) setBlogs(blogData.slice(0, 6));
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  const figmaUi = useMemo(
    () =>
      designs
        .filter((item) =>
          (item.categories || []).some((c: string) => ["Figma", "UI Kits"].includes(c))
        )
        .slice(0, 8),
    [designs]
  );
  const templates = useMemo(
    () =>
      designs
        .filter((item) =>
          (item.categories || []).some((c: string) =>
            ["Template", "Templates", "Presentation", "Presentations", "Social Media"].includes(c)
          )
        )
        .slice(0, 8),
    [designs]
  );
  const posters = useMemo(
    () =>
      designs
        .filter((item) =>
          (item.categories || []).some((c: string) => ["Poster", "Posters"].includes(c))
        )
        .slice(0, 8),
    [designs]
  );
  const banners = useMemo(() => {
    const filtered = designs.filter((item) =>
      (item.categories || []).some((c: string) => ["Banner", "Banners"].includes(c))
    );
    return (filtered.length > 0 ? filtered : designs).slice(0, 8);
  }, [designs]);

  return (
    <main className="min-h-[100dvh] bg-white">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-white px-6 pb-20 pt-16 sm:pt-20 lg:pt-24">
        <div className="pointer-events-none absolute -top-32 right-10 h-72 w-72 rounded-full bg-primary/20 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-accent/20 blur-[140px]" />
        <div className="pointer-events-none absolute right-1/3 top-20 h-40 w-40 rounded-full bg-accent2/20 blur-[120px]" />

        <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left — text content */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
            <motion.p
              variants={stagger}
              className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500"
            >
              QuickDzyn Marketplace
            </motion.p>
            <motion.h1
              variants={stagger}
              className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            >
              The premium marketplace for digital design assets
            </motion.h1>
            <motion.p variants={stagger} className="max-w-2xl text-lg text-slate-600 sm:text-xl">
              Elevate your next project instantly. Discover thousands of high-quality Figma UI kits, web templates, posters, and social media graphics created by top designers.
            </motion.p>

            <motion.div variants={stagger} className="w-full pb-2">
              <SearchBar />
            </motion.div>

            <motion.div variants={stagger} className="flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(99,91,255,0.35)] transition hover:bg-primary/90"
                  href="/designs"
                >
                  Browse Designs
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  className="rounded-full border border-slate-200 bg-white/80 px-7 py-3 text-sm font-semibold text-slate-900 transition hover:border-primary/60 hover:shadow-[0_0_24px_rgba(99,91,255,0.2)]"
                  href="/contact"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>

            <div className="flex flex-wrap gap-2">
              {heroBadges.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm"
                >
                  <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Auto-cycling showcase (replaces Featured Creator) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <HeroShowcase designs={designs} />
          </motion.div>
        </div>
      </section>

      {/* ── WHY QUICKDZYN (replaces bad asset library section) ── */}
      <Section className="w-full bg-slate-50 px-6 pt-40 pb-12 lg:pt-56 lg:pb-16 mt-16">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="text-center mb-12">
            <p className="text-base sm:text-lg lg:text-xl font-bold uppercase tracking-[0.35em] text-primary mb-4">
              Why QuickDzyn
            </p>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Everything you need to build faster
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-slate-600">
              From instant downloads to commercial licensing — we&apos;ve built the marketplace around your creative workflow.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all"
              >
                <span className="text-2xl">{card.icon}</span>
                <h3 className="mt-3 text-[15px] font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FIGMA UI KITS CAROUSEL ───────────────────────────── */}
      {figmaUi.length > 0 && (
        <Section className="w-full bg-white px-6 py-12 lg:py-16">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Figma UI Kits</p>
                <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                  Ready-to-use Figma systems
                </h2>
              </div>
              <Link href="/category/figma-kits" className="text-sm font-semibold text-primary transition hover:text-primary/80">
                View all →
              </Link>
            </div>
            <Carousel>
              {figmaUi.map((design) => (
                <DesignCard key={design._id || design.slug} design={design} />
              ))}
            </Carousel>
          </div>
        </Section>
      )}

      {/* ── TEMPLATES CAROUSEL ───────────────────────────────── */}
      {templates.length > 0 && (
        <Section className="w-full bg-slate-50 px-6 py-12 lg:py-16">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Web & Presentation Templates</p>
                <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                  Portfolios, pitch decks & social kits
                </h2>
              </div>
              <Link href="/category/templates" className="text-sm font-semibold text-primary transition hover:text-primary/80">
                Explore all →
              </Link>
            </div>
            <Carousel>
              {templates.map((design) => (
                <DesignCard key={design._id || design.slug} design={design} />
              ))}
            </Carousel>
          </div>
        </Section>
      )}

      {/* ── POSTERS CAROUSEL ─────────────────────────────────── */}
      {posters.length > 0 && (
        <Section className="w-full bg-white px-6 py-12 lg:py-16">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Posters</p>
                <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                  Bold poster systems for events & brands
                </h2>
              </div>
              <Link href="/category/posters" className="text-sm font-semibold text-primary transition hover:text-primary/80">
                View all →
              </Link>
            </div>
            <Carousel>
              {posters.map((design) => (
                <DesignCard key={design._id || design.slug} design={design} />
              ))}
            </Carousel>
          </div>
        </Section>
      )}

      {/* ── BANNERS CAROUSEL ─────────────────────────────────── */}
      {banners.length > 0 && (
        <Section className="w-full bg-slate-50 px-6 py-12 lg:py-16">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Banners</p>
                <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                  Campaign-ready banners for web & print
                </h2>
              </div>
              <Link href="/category/banners" className="text-sm font-semibold text-primary transition hover:text-primary/80">
                View all →
              </Link>
            </div>
            <Carousel>
              {banners.map((design) => (
                <DesignCard key={design._id || design.slug} design={design} />
              ))}
            </Carousel>
          </div>
        </Section>
      )}

      {/* ── BLOG POSTS ───────────────────────────────────────── */}
      {blogs.length > 0 && (
        <Section className="w-full bg-white px-6 py-12 lg:py-16">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Insights</p>
                <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Latest blog posts</h2>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-primary transition hover:text-primary/80">
                Visit blog →
              </Link>
            </div>

            <div className="space-y-4">
              {blogs.map((post) => (
                <motion.article
                  key={post.slug}
                  whileHover={{ y: -4 }}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:flex-row sm:items-center"
                >
                  <div className="h-24 w-full overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-36 flex-shrink-0">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">{post.date}</p>
                    <h3 className="mt-1 text-base font-semibold text-slate-900 line-clamp-1">{post.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 line-clamp-1">{post.summary}</p>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-primary shrink-0">
                    Read →
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── CTA — Premium Clean Redesign ───────────────────────────── */}
      <Section className="w-full px-6 py-16 lg:py-24 relative overflow-hidden bg-white">
        {/* Background Accents (Clean/White style) */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-emerald-500/5 blur-[120px]" />

        <div className="mx-auto w-full max-w-[1400px]">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

            {/* Left — Clean text block */}
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Join the Network
              </div>

              <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                Start building{" "}
                <span className="text-primary italic font-normal">
                  extraordinary
                </span>{" "}
                experiences
              </h2>

              <p className="max-w-xl text-lg text-slate-600 leading-relaxed">
                Empower your creative process with structured, production-ready design mockups. Say goodbye to starting from scratch.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/designs"
                    className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(99,91,255,0.25)] transition hover:bg-primary/90 hover:shadow-[0_8px_40px_rgba(99,91,255,0.35)]"
                  >
                    Explore Resources
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 hover:shadow"
                  >
                    Become a Creator
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Right — Minimal Stat Grid / Graphic */}
            <div className="relative z-10 lg:pl-10">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "5,000+", label: "Premium Assets", desc: "Curated UI kits & templates" },
                  { title: "350+", label: "Creators", desc: "Top talent worldwide" },
                  { title: "24/7", label: "Support", desc: "Always here to help" },
                  { title: "100%", label: "Royalty Free", desc: "Commercial license included" },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group rounded-3xl border border-slate-200 bg-slate-50/50 p-6 transition hover:border-slate-300 hover:bg-white hover:shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
                  >
                    <h3 className="text-3xl font-semibold tracking-tight text-slate-900 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-slate-700">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="absolute -inset-4 -z-10 rounded-[40px] bg-slate-100/40 opacity-0 transition-opacity duration-500 hover:opacity-100 hidden lg:block" />
            </div>

          </div>
        </div>
      </Section>
    </main>
  );
}
