"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const col1Links = [
    { href: "/", label: "Home" },
    { href: "/category/figma-kits", label: "Figma UI Kits" },
    { href: "/category/posters", label: "Posters" },
    { href: "/category/banners", label: "Banners" },
    { href: "/category/templates", label: "Web & Presentations" },
  ];

  const col2Links = [
    { href: "/blog", label: "Blogs" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Support" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ];

  return (
    <footer className="w-full bg-white">
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#5f55ff] via-[#6a62ff] to-[#7b72ff] text-white">
        <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-white/10 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-8 h-64 w-64 rounded-full bg-white/10 blur-[140px]" />

        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 sm:px-12 md:px-20 lg:px-28">
          <div className="grid items-start gap-12 text-left md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-2xl font-semibold">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white text-sm">QD</span>
                QuickDzyn
              </div>
              <p className="text-sm leading-relaxed text-white/85">
                Subscribe QuickDzyn Youtube channel to watch more videos on website development and Press the bell icon to get immediate notification of latest videos.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">Office</p>
                <span className="block h-1 w-12 rounded-full bg-white/90" />
              </div>
              <div className="text-sm text-white/85 leading-tight space-y-1.5">
                <p>Ambala Cantt,<br />Haryana,<br />PIN 133001, India</p>
                <p className="text-white/90 pt-1">hello@quickdzyn.com</p>
                <p className="font-semibold text-white">+91 - 0123456789</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">Links</p>
                <span className="block h-1 w-12 rounded-full bg-white/90" />
              </div>
              <div className="flex gap-x-8 text-sm text-white">
                <div className="space-y-2.5 flex-1">
                  {col1Links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="block font-medium text-white/90 transition hover:text-white sm:whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="space-y-2.5 flex-1">
                  {col2Links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="block font-medium text-white/90 transition hover:text-white sm:whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">Newsletter</p>
                <span className="block h-1 w-12 rounded-full bg-white/90" />
              </div>
              <form className="mt-2">
                <div className="flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    placeholder="Enter your email id"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/70 outline-none"
                  />
                  <button type="submit" className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#5f55ff] text-sm font-semibold">
                    &gt;
                  </button>
                </div>
              </form>

              <div className="flex items-center gap-3 pt-2">
                <a href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/20 pt-6 text-center text-xs text-white/70">
            QuickDzyn Copyright 2026 - All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
