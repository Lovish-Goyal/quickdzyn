"use client";

import { motion } from "framer-motion";
import { Search, Bell, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminTopbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4"
    >
      <div className="flex flex-1 items-center gap-4">
        <div className="relative hidden w-full max-w-2xl items-center rounded-xl bg-slate-100/80 px-4 py-2.5 sm:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search content, tags, or authors..."
            className="ml-3 w-full bg-transparent text-[14px] font-medium text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 pl-4">
        <button
          type="button"
          className="relative text-slate-500 transition hover:text-slate-800"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 fill-slate-700 text-slate-700" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-6 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="hidden text-right leading-tight sm:block">
            <p className="text-[14px] font-semibold text-slate-900">Alex Rivera</p>
            <p className="text-[12px] font-medium text-slate-500">Editor in Chief</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFD1B3] text-[#B35900]">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
