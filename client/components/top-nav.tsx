"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export const siteNavLinks = [
  { href: "/", label: "Home" },
  { href: "/category/figma-kits", label: "Figma UI Kits" },
  { href: "/category/posters", label: "Posters" },
  { href: "/category/banners", label: "Banners" },
  { href: "/category/templates", label: "Web & Presentations" },
  { href: "/blog", label: "Blogs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Support" },
];

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-4 px-6 py-3">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition group">
          <img
            src="/icon.svg"
            alt="QuickDzyn logo"
            className="h-8 w-8 rounded-xl shadow-md shadow-primary/10 transition-transform group-hover:scale-105"
          />
          <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950">
            QuickDzyn
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-x-6 gap-y-2 md:flex">
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-700">
            {siteNavLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <motion.div
                  key={link.href}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href={link.href}
                    className={`group relative inline-flex items-center transition-colors ${isActive ? "text-primary" : "text-slate-800 hover:text-primary"
                      }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-primary via-accent2 to-accent transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>


          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/designs"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,91,255,0.35)] transition hover:bg-primary/90"
            >
              Browse Designs
            </Link>
          </motion.div>
        </div>

        {/* Mobile: hamburger */}
        <div className="ml-auto flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-primary/40 hover:text-primary"
            aria-label="Open menu"
          >
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1H17M1 6H17M1 11H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>


      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {menuOpen && (
            <div className="fixed inset-0 z-[999] md:hidden flex justify-end">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setMenuOpen(false)}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
                aria-label="Close menu backdrop"
              />

              {/* Drawer Panel */}
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 26, stiffness: 220 }}
                className="relative h-full w-72 max-w-[85vw] bg-white p-6 shadow-2xl flex flex-col z-10"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <img
                      src="/icon.svg"
                      alt="QuickDzyn logo"
                      className="h-6 w-6 rounded-lg shadow-sm shadow-primary/10"
                    />
                    <span className="text-base font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950">
                      QuickDzyn
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                    aria-label="Close menu"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <nav className="mt-6 flex flex-col gap-2.5 text-sm font-semibold text-slate-700 overflow-y-auto pr-1">
                  {siteNavLinks.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== "/" && pathname.startsWith(link.href));
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`rounded-xl px-3 py-3 transition text-[15px] ${isActive ? "bg-primary/10 text-primary font-bold" : "hover:bg-slate-50"
                          }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                <Link
                  href="/designs"
                  onClick={() => setMenuOpen(false)}
                  className="mt-auto inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(99,91,255,0.35)] hover:bg-primary/95 transition"
                >
                  Browse Designs
                </Link>
              </motion.aside>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.header>
  );
}
