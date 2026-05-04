"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, ExternalLink, Clock, Navigation, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

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

const OVERVIEW_SRC = "https://yandex.kz/map-widget/v1/?ll=76.8943%2C43.269&z=11&l=map";

function getBranchSrc(b: Branch) {
  return `https://yandex.kz/map-widget/v1/?ll=${b.lng}%2C${b.lat}&z=16&pt=${b.lng}%2C${b.lat},pm2rdm&l=map`;
}

/* ─── Map block ─── */
function MapBlock({
  activeBranch,
  mapSrc,
  height,
  overviewLabel,
  mapTitleAll,
  mapTitleBranch,
}: {
  activeBranch: Branch | undefined;
  mapSrc: string;
  height: string;
  overviewLabel: string;
  mapTitleAll: string;
  mapTitleBranch: (name: string) => string;
}) {
  const [loading, setLoading] = useState(true);

  // Показываем скелетон при смене филиала, но НЕ перемонтируем iframe
  useEffect(() => { setLoading(true); }, [mapSrc]);

  const coords = activeBranch
    ? `${activeBranch.lat.toFixed(4)}°N · ${activeBranch.lng.toFixed(4)}°E`
    : `43.2567°N · 76.9286°E`;

  return (
    <div>
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: "2.5rem",
          border: "2px solid rgba(225,29,72,0.12)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
          height,
          background: "#F9FAFB",
        }}
      >
        {/* Скелетон-загрузка */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10"
               style={{ background: "#F9FAFB" }}>
            <div
              className="w-9 h-9 rounded-full border-[3px] border-t-transparent animate-spin"
              style={{ borderColor: "rgba(225,29,72,0.2)", borderTopColor: "#E11D48" }}
            />
            <span className="text-xs font-medium" style={{ color: "#9CA3AF" }}>Загрузка карты…</span>
          </div>
        )}

        {/* iframe — src меняется, но элемент НЕ пересоздаётся */}
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          onLoad={() => setLoading(false)}
          style={{
            border: "none",
            display: "block",
            opacity: loading ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
          allowFullScreen
          title={activeBranch ? mapTitleBranch(activeBranch.name) : mapTitleAll}
        />
      </div>

      {/* Decorative coordinates */}
      <div className="flex items-center justify-between mt-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#E11D48" }} />
          <span className="mono text-[10px]" style={{ color: "#9CA3AF" }}>
            {activeBranch ? `ФИЛИАЛ · ${activeBranch.name.toUpperCase()}` : overviewLabel}
          </span>
        </div>
        <span className="mono text-[9px]" style={{ color: "#E2E8F0" }}>{coords}</span>
      </div>
    </div>
  );
}

/* ─── Branch card (desktop) ─── */
function BranchCard({
  branch,
  isActive,
  onSelect,
  branchLabel,
  openIn2Gis,
}: {
  branch: Branch;
  isActive: boolean;
  onSelect: () => void;
  branchLabel: (tag: string) => string;
  openIn2Gis: string;
}) {
  return (
    <motion.button
      onClick={onSelect}
      animate={{ y: isActive ? -6 : 0 }}
      whileHover={{ y: isActive ? -6 : -2 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="w-full text-left relative overflow-hidden"
      style={{
        background: "#FFFFFF",
        borderRadius: "1.5rem",
        border: "1px solid #F1F5F9",
        borderLeft: isActive ? "4px solid #DC2626" : "4px solid transparent",
        boxShadow: isActive
          ? "0 20px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)"
          : "0 1px 4px rgba(0,0,0,0.05)",
        padding: "1.1rem 1.25rem 1.1rem 1rem",
        transition: "box-shadow 0.25s ease, border-left-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 8px 24px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)";
        }
      }}
    >
      {/* Tag + name row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <span
            className="text-[10px] font-black uppercase tracking-widest block mb-0.5"
            style={{ color: isActive ? "#DC2626" : "#9CA3AF" }}
          >
            {branchLabel(branch.tag)}
          </span>
          <p className="font-black text-base leading-tight" style={{ color: "#111827" }}>
            {branch.name}
          </p>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: isActive ? "rgba(220,38,38,0.08)" : "#F9FAFB",
            border: isActive ? "1px solid rgba(220,38,38,0.2)" : "1px solid #F1F5F9",
          }}
        >
          {isActive
            ? <Navigation size={14} style={{ color: "#DC2626" }} />
            : <MapPin size={14} style={{ color: "#9CA3AF", opacity: 0.25 }} />}
        </div>
      </div>

      {/* Address */}
      <p className="text-xs leading-snug mb-3" style={{ color: "#6B7280" }}>
        {branch.address}
      </p>

      {/* Expanded info when active */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="pt-3 space-y-2"
              style={{ borderTop: "1px solid #F1F5F9" }}
            >
              <div className="flex items-center gap-2">
                <Phone size={12} style={{ color: "#9CA3AF" }} />
                <a
                  href={`tel:${branch.phone.replace(/\D/g, "")}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-semibold transition-colors"
                  style={{ color: "#374151" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#DC2626")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#374151")}
                >
                  {branch.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={12} style={{ color: "#9CA3AF" }} />
                <span className="text-xs" style={{ color: "#6B7280" }}>{branch.hours}</span>
              </div>
              <a
                href={branch.twoGis}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full transition-all"
                style={{
                  background: "#E11D48",
                  color: "#fff",
                  boxShadow: "0 4px 14px rgba(225,29,72,0.35)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#BE123C"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#E11D48"; }}
              >
                <ExternalLink size={11} />
                {openIn2Gis}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ─── Main section ─── */
export default function BranchesSection() {
  const { t } = useLang();
  const b = t.branches;

  const [activeId, setActiveId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeBranch = BRANCHES.find((b) => b.id === activeId);
  const mapSrc = activeBranch ? getBranchSrc(activeBranch) : OVERVIEW_SRC;

  const select = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
    const el = document.getElementById(`branch-mob-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const scrollCards = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  const mapProps = {
    activeBranch, mapSrc,
    overviewLabel:  b.overviewLabel,
    mapTitleAll:    b.mapTitleAll,
    mapTitleBranch: b.mapTitleBranch,
  };

  return (
    <section id="branches" className="py-12 sm:py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <div className="label-tag mb-5">{b.tag}</div>
          <h2
            className="font-black leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", color: "#111827", letterSpacing: "-0.025em" }}
          >
            {b.title}{" "}
            <span style={{ color: "#DC2626" }}>{b.titleAccent}</span>
          </h2>
          <p className="text-sm mt-3" style={{ color: "#9CA3AF" }}>
            {b.subtitle}
          </p>
        </motion.div>

        {/* ══════════════════════════════════
            DESKTOP (lg+)
        ══════════════════════════════════ */}
        <div className="hidden lg:grid grid-cols-5 gap-8 items-start">

          {/* Cards column — gap-6 between cards */}
          <div className="col-span-2 space-y-6">
            {BRANCHES.map((branch) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                isActive={activeId === branch.id}
                onSelect={() => select(branch.id)}
                branchLabel={b.branchLabel}
                openIn2Gis={b.openIn2Gis}
              />
            ))}

            {activeId !== null && (
              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setActiveId(null)}
                className="w-full py-2.5 rounded-2xl text-xs font-semibold transition-all"
                style={{ color: "#9CA3AF", border: "1px solid #F1F5F9" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#DC2626";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,38,38,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#9CA3AF";
                  (e.currentTarget as HTMLElement).style.borderColor = "#F1F5F9";
                }}
              >
                {b.showAll}
              </motion.button>
            )}
          </div>

          {/* Map column */}
          <div className="col-span-3 sticky top-24">
            <MapBlock {...mapProps} height="540px" />
          </div>
        </div>

        {/* ══════════════════════════════════
            MOBILE (< lg)
        ══════════════════════════════════ */}
        <div className="lg:hidden">
          {/* Map */}
          <div className="mb-6">
            <MapBlock {...mapProps} height="280px" />
          </div>

          {/* Scroll arrows */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium" style={{ color: "#9CA3AF" }}>
              {b.scrollHint}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => scrollCards("left")}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ border: "1px solid #F1F5F9", color: "#9CA3AF" }}
                aria-label="Влево"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => scrollCards("right")}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ background: "#DC2626" }}
                aria-label="Вправо"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Horizontal scroll */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto pb-4"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          >
            {BRANCHES.map((branch) => {
              const isActive = activeId === branch.id;
              return (
                <button
                  key={branch.id}
                  id={`branch-mob-${branch.id}`}
                  onClick={() => select(branch.id)}
                  className="shrink-0 text-left"
                  style={{
                    width: 250,
                    scrollSnapAlign: "start",
                    background: "#FFFFFF",
                    borderRadius: "1.5rem",
                    border: "1px solid #F1F5F9",
                    borderLeft: isActive ? "4px solid #DC2626" : "4px solid transparent",
                    padding: "1rem",
                    boxShadow: isActive
                      ? "0 12px 32px rgba(0,0,0,0.1)"
                      : "0 1px 6px rgba(0,0,0,0.05)",
                    transition: "all 0.22s ease",
                  }}
                >
                  <span
                    className="text-[10px] font-black uppercase tracking-widest block mb-0.5"
                    style={{ color: isActive ? "#DC2626" : "#9CA3AF" }}
                  >
                    {b.branchLabel(branch.tag)}
                  </span>
                  <p className="font-black text-sm leading-tight mb-2" style={{ color: "#111827" }}>
                    {branch.name}
                  </p>
                  <p className="text-xs leading-snug mb-2" style={{ color: "#6B7280" }}>
                    {branch.address}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Phone size={11} style={{ color: "#9CA3AF" }} />
                    <span className="text-xs font-medium" style={{ color: "#374151" }}>
                      {branch.phone}
                    </span>
                  </div>
                  {isActive && (
                    <a
                      href={branch.twoGis}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs font-bold mt-2 px-3 py-1.5 rounded-full transition-all"
                      style={{ background: "#E11D48", color: "#fff", boxShadow: "0 3px 10px rgba(225,29,72,0.3)" }}
                    >
                      <ExternalLink size={10} />
                      {b.openIn2Gis}
                    </a>
                  )}
                </button>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {BRANCHES.map((b) => (
              <button
                key={b.id}
                onClick={() => select(b.id)}
                className="rounded-full transition-all"
                style={{
                  width: activeId === b.id ? 20 : 6,
                  height: 6,
                  background: activeId === b.id ? "#DC2626" : "#E2E8F0",
                }}
                aria-label={b.name}
              />
            ))}
          </div>
        </div>

        {/* ── Phone CTA ── */}
        <div
          className="mt-10 rounded-3xl p-6 text-center"
          style={{ background: "#F9FAFB", border: "1px solid #F1F5F9" }}
        >
          <p className="text-sm mb-1.5" style={{ color: "#9CA3AF" }}>
            {b.callCenterNote}
          </p>
          <a
            href="tel:87776667096"
            className="text-2xl font-black transition-colors"
            style={{ color: "#111827" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#DC2626")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#111827")}
          >
            8-777-666-70-96
          </a>
        </div>

      </div>
    </section>
  );
}
