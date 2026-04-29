import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "АмурАвто — Автошкола в Алматы",
  description:
    "Автошкола АмурАвто в Алматы. 6 филиалов, категория B, профессиональные инструкторы, 100% сдача экзамена ПДД.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col" style={{ background: "#FFFFFF", color: "#111827", fontFamily: "var(--font-inter), sans-serif" }}>
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>

    </html>
  );
}
