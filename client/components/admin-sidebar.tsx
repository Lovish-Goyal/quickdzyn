"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Home,
  Palette,
  Image as ImageIcon,
  Megaphone,
  Monitor,
  BookOpen,
  Info,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { siteNavLinks } from "./top-nav";

const iconMap: Record<string, any> = {
  Home: Home,
  "Figma UI Kits": Palette,
  Posters: ImageIcon,
  Banners: Megaphone,
  "Web & Presentations": Monitor,
  Blogs: BookOpen,
  About: Info,
  Support: HelpCircle,
};

const sectionMap: Record<string, string> = {
  Home: "home",
  "Figma UI Kits": "figma-kits",
  Posters: "posters",
  Banners: "banners",
  "Web & Presentations": "templates",
  Blogs: "insights",
  About: "about",
  Support: "support",
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSection = searchParams.get("section") || "home";

  return (
    <div className="flex h-full flex-col justify-between py-6">
      <div>
        <div className="flex items-center gap-3 px-6 pb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <Sparkles className="h-5 w-5 fill-white" />
          </div>
          <div>
            <p className="text-[17px] font-bold tracking-tight text-slate-900">QuickDzyn</p>
            <p className="text-[13px] font-medium text-slate-500">Admin Dashboard</p>
          </div>
        </div>

        <nav className="space-y-1.5 px-4">
          {siteNavLinks.map((item) => {
            const section = sectionMap[item.label] || "home";
            const active = currentSection === section;
            const Icon = iconMap[item.label] || Home;
            return (
              <Link
                key={item.href}
                href={`/admin/dashboard?section=${section}`}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] transition-colors ${
                  active
                    ? "bg-primary/10 text-primary font-semibold"
                    : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-4 pb-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Need help?
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Check docs or contact support for assistance.
          </p>
          <Link
            href="/admin/dashboard?section=support"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-primary px-3 py-2 text-xs font-semibold text-white"
          >
            Support
          </Link>
        </div>
      </div>
    </div>
  );
}
