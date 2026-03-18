"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getDesigns } from "@/lib/api";
import SearchBar from "@/components/search-bar";

const gridVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.06 },
    },
};

const getCategoryDetails = (slug: string) => {
    switch (slug) {
        case "figma-kits":
            return {
                title: "Figma UI Kits",
                description: "Speed up your workflow with auto-layout ready components, global styles, and dark mode variants.",
                filters: ["Figma", "UI Kits"],
            };
        case "posters":
            return {
                title: "High-Res Posters & Print",
                description: "Discover typography-rich, CMYK print-ready poster files for your next big event or campaign.",
                filters: ["Poster", "Posters"],
            };
        case "banners":
            return {
                title: "Conversion-Focused Banners",
                description: "A vast collection of IAB standard Google Network banner templates designed to drive clicks.",
                filters: ["Banner", "Banners"],
            };
        case "templates":
            return {
                title: "Web & Presentation Templates",
                description: "Premium layouts for portfolios, pitch decks, and social media campaigns.",
                filters: ["Template", "Templates", "Presentation", "Presentations", "Social Media"],
            };
        default:
            return null;
    }
};

export default function CategoryPage() {
    const params = useParams<{ slug: string }>();
    const slug = params?.slug ?? "";

    const [designs, setDesigns] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const categoryInfo = useMemo(() => getCategoryDetails(slug), [slug]);

    useEffect(() => {
        setLoading(true);
        getDesigns()
            .then((data) => Array.isArray(data) && setDesigns(data))
            .catch(() => null)
            .finally(() => setLoading(false));
    }, []);

    const filteredDesigns = useMemo(() => {
        if (!categoryInfo) return [];
        return designs.filter((item) =>
            item.categories?.some((c) => categoryInfo.filters.includes(c))
        );
    }, [categoryInfo, designs]);

    if (!categoryInfo) {
        return (
            <main className="min-h-screen bg-white">
                <section className="w-full bg-gradient-to-b from-primary/10 via-white to-white px-6 py-20">
                    <div className="mx-auto w-full max-w-[1200px] text-center">
                        <h1 className="mt-4 text-3xl font-semibold text-slate-900">Category Not Found</h1>
                        <Link
                            href="/designs"
                            className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-primary/60"
                        >
                            Back to all designs
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <section className="w-full bg-gradient-to-b from-accent2/10 via-white to-white px-6 pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24">
                <div className="mx-auto w-full max-w-[1400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                            {categoryInfo.title}
                        </h1>
                        <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
                            {categoryInfo.description}
                        </p>
                        <div className="pt-2">
                            <SearchBar placeholder="Search related designs..." />
                        </div>
                    </motion.div>

                    {loading ? (
                        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="h-[340px] animate-pulse rounded-3xl border border-slate-200 bg-white shadow-md"
                                />
                            ))}
                        </div>
                    ) : filteredDesigns.length === 0 ? (
                        <div className="mt-12 text-center text-slate-500">
                            No designs found for this category yet.
                        </div>
                    ) : (
                        <motion.div
                            variants={gridVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {filteredDesigns.map((template) => (
                                <motion.div
                                    key={template.slug}
                                    variants={gridVariants}
                                    whileHover={{ y: -6 }}
                                    className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_48px_rgba(15,23,42,0.12)] transition-shadow cursor-pointer group"
                                >
                                    <Link href={`/designs/${template.slug}`} className="flex h-full flex-col">
                                        <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                                            <img
                                                src={template.images?.[0] || template.image}
                                                alt={template.title}
                                                className="h-full w-full object-contain bg-slate-50 transition-transform duration-500 ease-out group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-5">
                                                <span className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-lg">Preview</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col gap-3 p-5 bg-white relative">
                                            <div className="flex items-start justify-between gap-3">
                                                <h2 className="text-[16px] font-semibold text-slate-900 line-clamp-1">{template.title}</h2>
                                                <span className="text-sm font-bold text-primary shrink-0">{template.price}</span>
                                            </div>
                                            <p className="text-sm text-slate-500 line-clamp-2">
                                                {template.description}
                                            </p>
                                            <div className="mt-auto flex items-center gap-2 pt-2">
                                                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                                                    {(template.categories || [])[0] || "Design"}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>
        </main>
    );
}
