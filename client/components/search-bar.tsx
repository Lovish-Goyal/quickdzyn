"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ placeholder = "Search designs, templates, posters..." }: { placeholder?: string }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/designs?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
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
        onChange={(e) => setSearchQuery(e.target.value)}
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
