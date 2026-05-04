import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import MobileStickyBar from "@/components/MobileStickyBar";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "АмурАвто — Автошкола в Алматы",
  description:
    "Автошкола АмурАвто в Алматы. 6 филиалов, категория B, профессиональные инструкторы, 100% сдача экзамена ПДД.",
  keywords: ["автошкола", "Алматы", "права", "категория B", "ПДД", "АмурАвто", "вождение"],
  openGraph: {
    title: "АмурАвто — Автошкола в Алматы",
    description: "6 филиалов · Категория B · 100% сдача ПДД · Профессиональные инструкторы",
    url: "https://amurauto.kz",
    siteName: "АмурАвто",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "АмурАвто — Автошкола в Алматы",
    description: "6 филиалов · Категория B · 100% сдача ПДД",
  },
  metadataBase: new URL("https://amurauto.kz"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col" style={{ background: "#FFFFFF", color: "#111827", fontFamily: "var(--font-inter), sans-serif" }}>
        <Providers>
          <TopBar />
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <MobileStickyBar />
        </Providers>
      </body>

    </html>
  );
}
