"use client";

import { usePathname } from "next/navigation";
import TopNav from "@/components/top-nav";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <TopNav />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}
