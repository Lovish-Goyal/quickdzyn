"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function SearchBarInput({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Keep search input in sync with URL parameter
  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (pathname === "/designs" || pathname.startsWith("/category/")) {
      const params = new URLSearchParams(searchParams.toString());
      if (val.trim()) {
        params.set("q", val);
      } else {
        params.delete("q");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (pathname === "/designs" || pathname.startsWith("/category/")) {
      // Already filtered in real-time, just blur input focus
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    } else {
      if (query) {
        router.push(`/designs?q=${encodeURIComponent(query)}`);
      } else {
        router.push("/designs");
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full items-center gap-3 overflow-hidden rounded-full border border-slate-200 bg-white/90 px-3 py-2 shadow-sm transition-all focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/20 backdrop-blur-md sm:max-w-lg">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 flex-shrink-0 ml-1">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChange}
        className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />
      <button
        type="submit"
        className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white hover:bg-primary/90 transition"
      >
        Search
      </button>
    </form>
  );
}

export default function SearchBar({ placeholder = "Search designs, templates, posters..." }: { placeholder?: string }) {
  return (
    <Suspense fallback={<div className="h-10 w-full animate-pulse rounded-full bg-slate-100 sm:max-w-lg" />}>
      <SearchBarInput placeholder={placeholder} />
    </Suspense>
  );
}
