"use client";

import { ReactNode, Suspense, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import AdminSidebar from "@/components/admin-sidebar";
import AdminTopbar from "@/components/admin-topbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/admin" || pathname === "/admin/login";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // Show a minimal layout for the login page, and the full admin layout everywhere else.
  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <main className="min-h-screen">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:flex">
          <Suspense
            fallback={
              <div className="flex h-full w-full flex-col gap-4 p-6">
                <div className="h-10 w-32 rounded-xl bg-slate-100" />
                <div className="space-y-2">
                  {[...Array(6)].map((_, idx) => (
                    <div key={idx} className="h-10 rounded-xl bg-slate-100" />
                  ))}
                </div>
              </div>
            }
          >
            <AdminSidebar />
          </Suspense>
        </aside>

        <div className="flex flex-1 flex-col">
          <div className="sticky top-0 z-30">
            <AdminTopbar onMenuToggle={() => setSidebarOpen(true)} />
          </div>
          <main className="flex-1 overflow-auto p-6 lg:p-10">{children}</main>
        </div>
      </div>

      {/* Mobile drawer layout */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-start">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="relative h-full w-72 max-w-[80vw] bg-white shadow-2xl flex flex-col z-10"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 flex-shrink-0">
                <span className="text-[17px] font-bold text-slate-900">Admin Panel</span>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
                  aria-label="Close sidebar menu"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Suspense
                  fallback={
                    <div className="flex h-full w-full flex-col gap-4 p-6 animate-pulse">
                      <div className="h-10 w-32 rounded-xl bg-slate-100" />
                    </div>
                  }
                >
                  <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
                </Suspense>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
