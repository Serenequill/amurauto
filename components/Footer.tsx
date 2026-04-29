"use client";

import { Phone, MapPin } from "lucide-react";

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

const LINKS = [
  { label: "Главная",   href: "#hero" },
  { label: "Филиалы",  href: "#branches" },
  { label: "Тест ПДД", href: "#signs" },
  { label: "Цены",     href: "#pricing" },
  { label: "О нас",    href: "#about" },
  { label: "Отзывы",   href: "#reviews" },
  { label: "Запись",   href: "#register" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#F9FAFB", borderTop: "1px solid #F1F5F9" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
          <div className="md:col-span-4">
            <div className="text-xl font-black mb-3 tracking-widest" style={{ color: "#111827", letterSpacing: "0.1em" }}>
              AMURAUTO
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#9CA3AF" }}>
              Профессиональная автошкола в Алматы. 6 филиалов, категория B, 100% сдача ПДД.
            </p>
            <div className="flex items-center gap-2 text-xs" style={{ color: "#D1D5DB" }}>
              <MapPin size={12} style={{ color: "#E11D48" }} />
              43.2567°N 76.9286°E · г. Алматы
            </div>
          </div>
          <div className="md:col-span-3 md:col-start-6">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#D1D5DB" }}>Навигация</h4>
            <ul className="space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm transition-colors" style={{ color: "#9CA3AF" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#111827")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9CA3AF")}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#D1D5DB" }}>Связаться</h4>
            <div className="flex items-center gap-2 mb-1.5 text-xs" style={{ color: "#9CA3AF" }}>
              <Phone size={12} style={{ color: "#E11D48" }} />Единый колл-центр:
            </div>
            <a href="tel:87776667096" className="text-xl font-black block mb-4 transition-colors" style={{ color: "#111827" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E11D48")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#111827")}>
              8-777-666-70-96
            </a>
            <a href="#register" className="inline-block font-bold text-sm px-5 py-2.5 rounded-sm btn-primary mb-4">Записаться</a>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#D1D5DB" }}>Мы в соцсетях</h4>
              <a
                href="https://www.instagram.com/amurauto.kz?igsh=MWNnYmNuM241NjVsZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{ background: "rgba(225,29,72,0.06)", color: "#E11D48", border: "1px solid rgba(225,29,72,0.15)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#E11D48";
                  el.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(225,29,72,0.06)";
                  el.style.color = "#E11D48";
                }}
              >
                <InstagramIcon size={15} />
                @amurauto.kz
              </a>
            </div>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid #F1F5F9" }}>
          <p className="text-xs" style={{ color: "#D1D5DB" }}>© {new Date().getFullYear()} АмурАвто. Все права защищены.</p>
          <p className="mono">ЛИЦ. KZ-B-2024 · Алматы · 6 ФИЛИАЛОВ</p>
        </div>
      </div>
    </footer>
  );
}
