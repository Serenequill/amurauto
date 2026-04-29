"use client";

import { useState, useRef } from "react";
import { MapPin, Phone, ExternalLink, Clock, Navigation, ChevronLeft, ChevronRight } from "lucide-react";

/* ── Car SVG for hover animation ── */
function CarIcon({ color = "#E11D48" }: { color?: string }) {
  return (
    <svg viewBox="0 0 48 24" width="36" height="18" fill="none" aria-hidden>
      <rect x="6" y="8" width="36" height="12" rx="3" fill={color} />
      <path d="M10 8 L14 2 H34 L38 8" fill={color} opacity="0.8" />
      <circle cx="13" cy="21" r="3.5" fill="#111" />
      <circle cx="35" cy="21" r="3.5" fill="#111" />
      <rect x="14" y="3" width="8" height="5" rx="1" fill="rgba(255,255,255,0.35)" />
      <rect x="26" y="3" width="8" height="5" rx="1" fill="rgba(255,255,255,0.35)" />
      <rect x="36" y="11" width="5" height="3" rx="1" fill="#fbbf24" opacity="0.9" />
    </svg>
  );
}

/* ─── Branch data ─── */
const BRANCHES = [
  {
    id: 1, tag: "01", name: "Аксай",
    address: "мкр. Аксай-1, 15Б, офис 201, 2 эт.",
    phone: "+7 777 200-16-60",
    hours: "Пн–Пт 10:00–19:00",
    lat: 43.240724, lng: 76.834161,
    twoGis: "https://2gis.kz/almaty/geo/9429940001593162",
  },
  {
    id: 2, tag: "02", name: "Геологов",
    address: "ул. Геологов, 2/3, офис 27, 2 эт.",
    phone: "+7 707 560-69-11",
    hours: "Пн–Пт 10:00–19:00",
    lat: 43.35177, lng: 76.926594,
    twoGis: "https://2gis.kz/almaty/geo/70000001055444669",
  },
  {
    id: 3, tag: "03", name: "Акан Серы",
    address: "ул. Акан Серы, 11, Турксибский р-н",
    phone: "+7 777 251-11-15",
    hours: "Пн–Пт 10:00–19:00",
    lat: 43.332139, lng: 76.952357,
    twoGis: "https://2gis.kz/almaty/geo/70000001113619920",
  },
  {
    id: 4, tag: "04", name: "Жарокова",
    address: "ул. Жарокова, 322а, Бостандыкский р-н",
    phone: "+7 707 151-59-91",
    hours: "Пн–Пт 10:00–19:00",
    lat: 43.201726, lng: 76.906433,
    twoGis: "https://2gis.kz/almaty/geo/70000001089238696",
  },
  {
    id: 5, tag: "05", name: "Толе би",
    address: "ул. Толе би, 214а, 2 эт., Алмалинский р-н",
    phone: "+7 777 666-70-96",
    hours: "Пн–Пт 10:00–19:00",
    lat: 43.250537, lng: 76.888683,
    twoGis: "https://2gis.kz/almaty/geo/9429940000833475",
  },
  {
    id: 6, tag: "06", name: "Авто Лидер",
    address: "4-й мкр., 2Б, офис 16",
    phone: "+7 747 810-10-35",
    hours: "Пн–Пт 10:00–19:00",
    lat: 43.22866, lng: 76.858802,
    twoGis: "https://2gis.kz/almaty/geo/70000001036386260",
  },
];

type Branch = (typeof BRANCHES)[0];

// Yandex Maps widget — free, no API key, works in iframes, great CIS coverage.
// 2GIS blocks iframe embedding via X-Frame-Options on their main site.
// "Открыть в 2ГИС" buttons below still deep-link to 2GIS in a new tab.
// Center = average of all 6 branch coords; zoom 11 fits the spread
const OVERVIEW_SRC =
  "https://yandex.kz/map-widget/v1/?ll=76.8943%2C43.269&z=11&l=map";

function getBranchSrc(b: Branch) {
  // pm2rdm = red drop-pin marker
  return `https://yandex.kz/map-widget/v1/?ll=${b.lng}%2C${b.lat}&z=16&pt=${b.lng}%2C${b.lat},pm2rdm&l=map`;
}

/* ─── 2GIS Map block (shared between layouts) ─── */
function MapBlock({
  activeBranch,
  mapLoading,
  onLoad,
  mapKey,
  mapSrc,
  isMobile,
}: {
  activeBranch: Branch | undefined;
  mapLoading: boolean;
  onLoad: () => void;
  mapKey: string | number;
  mapSrc: string;
  isMobile?: boolean;
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        border: "2px solid #E11D48",
        borderRadius: isMobile ? "16px" : "16px",
        boxShadow: "0 8px 32px rgba(225,29,72,0.14)",
        height: isMobile ? "280px" : "520px",
      }}
    >
      {/* Red header bar */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-3 py-2"
        style={{ background: "#E11D48", height: "36px" }}
      >
        <div className="flex items-center gap-1.5">
          <MapPin size={13} color="#fff" />
          <span className="text-xs font-bold text-white tracking-wide truncate">
            {activeBranch ? `Филиал — ${activeBranch.name}` : "Все филиалы · Алматы"}
          </span>
        </div>
        <span className="text-xs font-semibold shrink-0" style={{ color: "rgba(255,255,255,0.7)" }}>
          Я.Карты
        </span>
      </div>

      {/* Loading overlay */}
      {mapLoading && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{ background: "#fef2f4", top: "36px" }}
        >
          <div className="text-center">
            <div
              className="w-9 h-9 rounded-full border-2 border-t-transparent mx-auto mb-2"
              style={{
                borderColor: "#E11D48",
                borderTopColor: "transparent",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <p className="text-xs font-medium" style={{ color: "#E11D48" }}>
              Загружаем карту…
            </p>
          </div>
        </div>
      )}

      {/* iframe */}
      <iframe
        key={String(mapKey)}
        src={mapSrc}
        width="100%"
        style={{ border: "none", display: "block", marginTop: "36px", height: "calc(100% - 36px)" }}
        allowFullScreen
        title={activeBranch ? `Филиал ${activeBranch.name}` : "Все филиалы АмурАвто"}
        onLoad={onLoad}
      />
    </div>
  );
}

/* ─── Main section ─── */
export default function BranchesSection() {
  const [activeId, setActiveId]   = useState<number | null>(null);
  const [mapLoading, setMapLoading] = useState(false);
  const [hoverId, setHoverId]       = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeBranch = BRANCHES.find((b) => b.id === activeId);
  const mapSrc = activeBranch ? getBranchSrc(activeBranch) : OVERVIEW_SRC;
  const mapKey = activeId ?? "overview";

  const select = (id: number) => {
    setMapLoading(true);
    setActiveId((prev) => (prev === id ? null : id));
    // scroll horizontal list so active card is visible on mobile
    const el = document.getElementById(`branch-card-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const scrollCards = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  const mapProps = { activeBranch, mapLoading, onLoad: () => setMapLoading(false), mapKey, mapSrc };

  return (
    <section id="branches" className="py-16 sm:py-20" style={{ background: "#fff" }}>
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{ color: "#E11D48", background: "rgba(225,29,72,0.08)" }}
          >
            Адреса
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: "#111827" }}>
            6 филиалов{" "}
            <span style={{ color: "#E11D48" }}>в Алматы</span>
          </h2>
          <p className="text-sm sm:text-base" style={{ color: "#6b7280" }}>
            Нажмите на адрес — карта переместится на нужный филиал
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════
          MOBILE LAYOUT  (< lg)
      ══════════════════════════════════ */}
      <div className="lg:hidden">
        {/* Map — full width, breaks out of padding */}
        <div className="px-4 sm:px-6 mb-5">
          <MapBlock {...mapProps} isMobile />
          <p className="text-xs text-center mt-2" style={{ color: "#9ca3af" }}>
            {activeBranch
              ? `📍 ${activeBranch.lat.toFixed(4)}°N, ${activeBranch.lng.toFixed(4)}°E`
              : "📍 Центр Алматы · выберите филиал ниже"}
          </p>
        </div>

        {/* Scroll hint + arrows */}
        <div className="flex items-center justify-between px-4 sm:px-6 mb-3">
          <p className="text-xs font-medium" style={{ color: "#9ca3af" }}>
            Прокрутите →
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => scrollCards("left")}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ border: "1.5px solid #e5e7eb", color: "#9ca3af" }}
              aria-label="Влево"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollCards("right")}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors text-white"
              style={{ background: "#E11D48" }}
              aria-label="Вправо"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal scroll cards */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-4 px-4 sm:px-6"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          {BRANCHES.map((branch) => {
            const isActive = activeId === branch.id;
            return (
              <button
                key={branch.id}
                id={`branch-card-${branch.id}`}
                onClick={() => select(branch.id)}
                className="shrink-0 text-left rounded-2xl p-4 transition-all"
                style={{
                  width: "260px",
                  scrollSnapAlign: "start",
                  background: isActive ? "#E11D48" : "#fff",
                  border: `2px solid ${isActive ? "#E11D48" : "#f3f4f6"}`,
                  boxShadow: isActive
                    ? "0 6px 20px rgba(225,29,72,0.25)"
                    : "0 1px 6px rgba(0,0,0,0.07)",
                }}
              >
                {/* Tag + name */}
                <div className="flex items-center justify-between mb-2.5">
                  <div>
                    <span
                      className="text-[10px] font-black uppercase tracking-widest block"
                      style={{ color: isActive ? "rgba(255,255,255,0.65)" : "#E11D48" }}
                    >
                      Филиал {branch.tag}
                    </span>
                    <span
                      className="font-black text-base leading-tight"
                      style={{ color: isActive ? "#fff" : "#111827" }}
                    >
                      {branch.name}
                    </span>
                  </div>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: isActive ? "rgba(255,255,255,0.2)" : "rgba(225,29,72,0.08)" }}
                  >
                    {isActive
                      ? <Navigation size={15} color="#fff" />
                      : <MapPin size={15} style={{ color: "#E11D48" }} />}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5">
                  <div className="flex items-start gap-1.5">
                    <MapPin size={12} className="shrink-0 mt-0.5" style={{ color: isActive ? "rgba(255,255,255,0.6)" : "#9ca3af" }} />
                    <span className="text-xs leading-snug" style={{ color: isActive ? "rgba(255,255,255,0.85)" : "#374151" }}>
                      {branch.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone size={12} className="shrink-0" style={{ color: isActive ? "rgba(255,255,255,0.6)" : "#9ca3af" }} />
                    <span className="text-xs font-medium" style={{ color: isActive ? "#fff" : "#374151" }}>
                      {branch.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="shrink-0" style={{ color: isActive ? "rgba(255,255,255,0.6)" : "#9ca3af" }} />
                    <span className="text-xs" style={{ color: isActive ? "rgba(255,255,255,0.75)" : "#6b7280" }}>
                      {branch.hours}
                    </span>
                  </div>
                </div>

                {/* 2GIS link when active */}
                {isActive && (
                  <a
                    href={branch.twoGis}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs font-semibold mt-3 pt-3"
                    style={{
                      color: "#fff",
                      borderTop: "1px solid rgba(255,255,255,0.2)",
                      display: "flex",
                      textDecoration: "underline",
                      textUnderlineOffset: "2px",
                    }}
                  >
                    <ExternalLink size={11} />
                    Открыть в 2ГИС
                  </a>
                )}
              </button>
            );
          })}

          {/* Reset card */}
          {activeId !== null && (
            <button
              onClick={() => { setActiveId(null); setMapLoading(true); }}
              className="shrink-0 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-sm font-medium"
              style={{
                width: "140px",
                scrollSnapAlign: "start",
                border: "2px dashed #e5e7eb",
                color: "#9ca3af",
                background: "#fafafa",
              }}
            >
              <MapPin size={20} style={{ color: "#d1d5db" }} />
              Все<br />филиалы
            </button>
          )}
        </div>

        {/* Scroll dots indicator */}
        <div className="flex justify-center gap-1.5 mt-2 px-4">
          {BRANCHES.map((b) => (
            <button
              key={b.id}
              onClick={() => select(b.id)}
              className="rounded-full transition-all"
              style={{
                width: activeId === b.id ? "20px" : "6px",
                height: "6px",
                background: activeId === b.id ? "#E11D48" : "#e5e7eb",
              }}
              aria-label={b.name}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════
          DESKTOP LAYOUT  (lg+)
      ══════════════════════════════════ */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-5 gap-6 items-start">

          {/* Branch list (left) */}
          <div className="col-span-2 space-y-3">
            {BRANCHES.map((branch) => {
              const isActive = activeId === branch.id;
              return (
                <button
                  key={branch.id}
                  onClick={() => select(branch.id)}
                  className="w-full text-left rounded-2xl p-5 transition-all"
                  style={{
                    background: isActive ? "#E11D48" : "#fff",
                    border: `2px solid ${isActive ? "#E11D48" : "#f3f4f6"}`,
                    boxShadow: isActive
                      ? "0 8px 24px rgba(225,29,72,0.25)"
                      : "0 1px 4px rgba(0,0,0,0.06)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    setHoverId(branch.id);
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(225,29,72,0.4)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(225,29,72,0.12)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    setHoverId(null);
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#f3f4f6";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
                    }
                  }}
                >
                  {/* Car animation strip */}
                  <div className="relative h-5 mb-2 overflow-hidden rounded-md" style={{ background: isActive ? "rgba(255,255,255,0.1)" : "rgba(225,29,72,0.04)" }}>
                    {hoverId === branch.id && (
                      <span className="absolute top-0.5 animate-car-drive">
                        <CarIcon color={isActive ? "#fff" : "#E11D48"} />
                      </span>
                    )}
                    {/* Dashed road line */}
                    <div className="absolute inset-0 flex items-center px-2">
                      <div className="w-full" style={{ borderTop: `2px dashed ${isActive ? "rgba(255,255,255,0.2)" : "rgba(225,29,72,0.15)"}` }} />
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[10px] font-black uppercase tracking-widest"
                          style={{ color: isActive ? "rgba(255,255,255,0.7)" : "#E11D48" }}
                        >
                          Филиал {branch.tag}
                        </span>
                        {isActive && (
                          <span
                            className="text-[9px] px-2 py-0.5 rounded-full font-bold"
                            style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
                          >
                            НА КАРТЕ
                          </span>
                        )}
                      </div>
                      <p className="font-black text-base leading-tight mb-1" style={{ color: isActive ? "#fff" : "#111827" }}>
                        {branch.name}
                      </p>
                      <p className="text-sm" style={{ color: isActive ? "rgba(255,255,255,0.8)" : "#6b7280" }}>
                        {branch.address}
                      </p>
                    </div>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: isActive ? "rgba(255,255,255,0.2)" : "rgba(225,29,72,0.08)" }}
                    >
                      {isActive
                        ? <Navigation size={16} color="#fff" />
                        : <MapPin size={16} style={{ color: "#E11D48" }} />}
                    </div>
                  </div>

                  {isActive && (
                    <div className="mt-3 pt-3 space-y-2" style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
                      <div className="flex items-center gap-2">
                        <Phone size={13} style={{ color: "rgba(255,255,255,0.6)" }} />
                        <a
                          href={`tel:${branch.phone.replace(/\D/g, "")}`}
                          className="text-sm font-semibold text-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {branch.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={13} style={{ color: "rgba(255,255,255,0.6)" }} />
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{branch.hours}</span>
                      </div>
                      <a
                        href={branch.twoGis}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold"
                        style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: "3px" }}
                      >
                        <ExternalLink size={13} />
                        Открыть в 2ГИС
                      </a>
                    </div>
                  )}
                </button>
              );
            })}

            {activeId !== null && (
              <button
                onClick={() => { setActiveId(null); setMapLoading(true); }}
                className="w-full py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ color: "#9ca3af", border: "1.5px dashed #e5e7eb" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E11D48"; (e.currentTarget as HTMLElement).style.color = "#E11D48"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb"; (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}
              >
                ← Показать все филиалы
              </button>
            )}
          </div>

          {/* Map (right, sticky) */}
          <div className="col-span-3 sticky top-24">
            <MapBlock {...mapProps} />
            <p className="text-xs text-center mt-2.5" style={{ color: "#9ca3af" }}>
              {activeBranch
                ? `📍 ${activeBranch.lat.toFixed(4)}°N, ${activeBranch.lng.toFixed(4)}°E`
                : "📍 43.2567°N, 76.9286°E · Центр Алматы"}
            </p>
          </div>
        </div>

        {/* Phone CTA */}
        <div
          className="mt-10 rounded-2xl p-6 text-center"
          style={{ background: "rgba(225,29,72,0.05)", border: "1.5px solid rgba(225,29,72,0.15)" }}
        >
          <p className="text-sm font-medium mb-2" style={{ color: "#6b7280" }}>
            Единый колл-центр — работает для всех филиалов
          </p>
          <a
            href="tel:87776667096"
            className="text-2xl font-black transition-colors"
            style={{ color: "#E11D48" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#be123c")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#E11D48")}
          >
            8-777-666-70-96
          </a>
        </div>
      </div>

      {/* Phone CTA mobile */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        <div
          className="rounded-2xl p-5 text-center"
          style={{ background: "rgba(225,29,72,0.05)", border: "1.5px solid rgba(225,29,72,0.15)" }}
        >
          <p className="text-sm font-medium mb-2" style={{ color: "#6b7280" }}>
            Единый колл-центр
          </p>
          <a
            href="tel:87776667096"
            className="text-xl font-black block mb-3"
            style={{ color: "#E11D48" }}
          >
            8-777-666-70-96
          </a>
          <a
            href="tel:87776667096"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-white text-base"
            style={{ background: "#E11D48" }}
          >
            <Phone size={17} />
            Позвонить сейчас
          </a>
        </div>
      </div>
    </section>
  );
}
