"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
import Image from "next/image";

const LINKS = [
  { label: "Филиалы",  href: "#branches" },
  { label: "Тест ПДД", href: "#signs" },
  { label: "Цены",     href: "#pricing" },
  { label: "О нас",    href: "#about" },
  { label: "Команда",  href: "#teachers" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #F1F5F9",
        boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <a href="#hero" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative w-8 h-8 transition-transform duration-200 group-hover:scale-105">
              <Image src="/logo.webp" alt="АмурАвто" fill className="object-contain" />
            </div>
            <span
              className="text-base font-black tracking-widest"
              style={{ color: "#000000", letterSpacing: "0.14em" }}
            >
              AMURAUTO
            </span>
          </a>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative group flex flex-col items-center gap-1 py-1"
              >
                <span
                  className="text-xs font-semibold uppercase tracking-widest transition-colors duration-200"
                  style={{ color: "#000000", letterSpacing: "0.1em" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E11D48")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#000000")}
                >
                  {l.label}
                </span>
                {/* Red dot indicator on hover */}
                <span
                  className="block w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 scale-0 group-hover:scale-100"
                  style={{ background: "#E11D48" }}
                />
              </a>
            ))}
          </nav>

          {/* ── CTA button ── */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:87776667096"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:scale-105"
              style={{
                background: "#E11D48",
                letterSpacing: "0.08em",
                boxShadow: "0 4px 14px rgba(225,29,72,0.25)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#BE123C";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(225,29,72,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#E11D48";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(225,29,72,0.25)";
              }}
            >
              <Phone size={13} />
              Позвонить
            </a>
          </div>

          {/* ── Mobile controls ── */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="tel:87776667096"
              className="w-9 h-9 flex items-center justify-center rounded-full text-white transition-all hover:scale-105"
              style={{ background: "#E11D48", boxShadow: "0 4px 14px rgba(225,29,72,0.3)" }}
              aria-label="Позвонить"
            >
              <Phone size={15} />
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
              style={{ background: "#F9FAFB", color: "#111827" }}
              aria-label="Меню"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 pt-3"
          style={{ background: "rgba(255,255,255,0.97)", borderTop: "1px solid #F1F5F9" }}
        >
          <nav className="flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3.5 text-sm font-semibold transition-colors"
                style={{ color: "#111827", borderBottom: "1px solid #F9FAFB" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E11D48")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#111827")}
              >
                {l.label}
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#E11D48" }} />
              </a>
            ))}
            <a
              href="tel:87776667096"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 py-3.5 mt-4 text-sm font-bold rounded-full text-white transition-all"
              style={{ background: "#E11D48", boxShadow: "0 4px 14px rgba(225,29,72,0.3)" }}
            >
              <Phone size={15} />
              8-777-666-70-96
            </a>
            <a
              href="https://www.instagram.com/amurauto.kz?igsh=MWNnYmNuM241NjVsZA=="
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 py-3 mt-2 text-sm font-bold rounded-full transition-all"
              style={{ background: "rgba(225,29,72,0.06)", color: "#E11D48", border: "1px solid rgba(225,29,72,0.15)" }}
            >
              <InstagramIcon size={15} />
              @amurauto.kz
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
