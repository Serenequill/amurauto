"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/contexts/LangContext";

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}


export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t }    = useLang();

  const LINKS = [
    { label: t.nav.branches, href: "#branches" },
    { label: t.nav.pdd,      href: "#signs"    },
    { label: t.nav.pricing,  href: "#pricing"  },
    { label: t.nav.about,    href: "#about"    },
    { label: t.nav.team,     href: "#teachers" },
    { label: t.nav.faq,      href: "#faq"      },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 z-50 transition-all duration-300"
      style={{
        top: "36px",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(241,245,249,0.8)",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.07)" : "none",
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
          <nav className="hidden md:flex items-center gap-7">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative group py-1"
              >
                <span
                  className="text-xs font-semibold uppercase transition-colors duration-200"
                  style={{ color: "#111827", letterSpacing: "0.1em" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E11D48")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#111827")}
                >
                  {l.label}
                </span>
                {/* Sliding red underline */}
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full rounded-full transition-all duration-200"
                  style={{ background: "#E11D48" }}
                />
              </a>
            ))}
          </nav>

          {/* ── Lang switcher + CTA ── */}
          <div className="hidden md:flex items-center gap-3">

            {/* RU | KZ toggle */}
            <div
              className="flex items-center rounded-full p-0.5"
              style={{ background: "#F3F4F6", border: "1px solid #E5E7EB" }}
            >
              {(["ru", "kz"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200"
                  style={{
                    background: lang === l ? "#E11D48" : "transparent",
                    color:      lang === l ? "#FFFFFF" : "#9CA3AF",
                    letterSpacing: "0.1em",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <motion.a
              href="tel:87776667096"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-bold text-xs text-white overflow-hidden"
              style={{
                background: "#E11D48",
                letterSpacing: "0.06em",
                boxShadow: "0 4px 16px rgba(225,29,72,0.35)",
              }}
            >
              {/* Pulse ring */}
              <span className="relative flex shrink-0">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
                  style={{ background: "rgba(255,255,255,0.6)" }}
                />
                <Phone size={13} className="relative" />
              </span>
              {t.nav.call}
            </motion.a>
          </div>

          {/* ── Mobile controls ── */}
          <div className="md:hidden flex items-center gap-2">
            {/* Lang switcher */}
            <div
              className="flex items-center rounded-full p-0.5"
              style={{ background: "#F3F4F6", border: "1px solid #E5E7EB" }}
            >
              {(["ru", "kz"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200"
                  style={{
                    background: lang === l ? "#E11D48" : "transparent",
                    color:      lang === l ? "#FFFFFF" : "#9CA3AF",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
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
                target="_blank" rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 py-3 mt-2 text-sm font-bold rounded-full transition-all"
                style={{ background: "rgba(225,29,72,0.06)", color: "#E11D48", border: "1px solid rgba(225,29,72,0.15)" }}
              >
                <InstagramIcon size={15} />
                @amurauto.kz
              </a>

              {/* Lang switcher — mobile */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#9CA3AF" }}>Язык / Тіл:</span>
                <div
                  className="flex items-center rounded-full p-0.5"
                  style={{ background: "#F3F4F6", border: "1px solid #E5E7EB" }}
                >
                  {(["ru", "kz"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setOpen(false); }}
                      className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200"
                      style={{
                        background: lang === l ? "#E11D48" : "transparent",
                        color:      lang === l ? "#FFFFFF" : "#9CA3AF",
                      }}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
