import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/client-layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "QuickDzyn",
  description: "Professional design templates for modern brands.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} min-h-screen bg-background text-foreground antialiased overflow-x-hidden`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
