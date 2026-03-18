"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin-sidebar";
import AdminTopbar from "@/components/admin-topbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/admin" || pathname === "/admin/login";

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
          <AdminSidebar />
        </aside>

        <div className="flex flex-1 flex-col">
          <div className="sticky top-0 z-30">
            <AdminTopbar />
          </div>
          <main className="flex-1 overflow-auto p-6 lg:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
