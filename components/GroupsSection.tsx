"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LangContext";
import type { Group } from "@/app/api/groups/route";

/* ─── WhatsApp phone routing ─── */
const BRANCH_PHONES: Record<string, string> = {
  "аксай":      "77772001660",
  "геолог":     "77075606911",
  "акан":       "77772511115",
  "жарок":      "77071515991",
  "толе":       "77776667096",
  "лидер":      "77478101035",
};
const DEFAULT_PHONE = "77776667096";

function getPhone(branch: string): string {
  const lower = branch.toLowerCase();
  for (const [key, phone] of Object.entries(BRANCH_PHONES)) {
    if (lower.includes(key)) return phone;
  }
  return DEFAULT_PHONE;
}

/* ─── Format badge config ─── */
type FormatKey = "Оффлайн" | "Дистанционно" | "Выходного дня";

const FORMAT_STYLE: Record<string, { bg: string; color: string; icon: string }> = {
  "Оффлайн":       { bg: "#F3F4F6",              color: "#6B7280", icon: "🏫" },
  "Дистанционно":  { bg: "rgba(99,102,241,0.10)", color: "#6366F1", icon: "💻" },
  "Выходного дня": { bg: "rgba(245,158,11,0.10)", color: "#D97706", icon: "📅" },
};

function formatStyle(fmt: string) {
  return FORMAT_STYLE[fmt as FormatKey] ?? FORMAT_STYLE["Оффлайн"];
}

/* ─── Skeleton ─── */
function Skeleton() {
  return (
    <div className="rounded-3xl p-6" style={{ background: "#FFF", border: "1px solid #F1F5F9", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
      {[80, 60, 90, 70].map((w, i) => (
        <div key={i} className="animate-pulse rounded-xl mb-3" style={{ background: "#F3F4F6", height: i === 0 ? 40 : 16, width: `${w}%` }} />
      ))}
      <div className="animate-pulse rounded-2xl mt-5" style={{ background: "#E5E7EB", height: 44 }} />
    </div>
  );
}

/* ─── Card ─── */
function GroupCard({ group }: { group: Group }) {
  const { t } = useLang();
  const g = t.groups;

  const phone = getPhone(group.branch);
  const waText = g.waMsg(
    group.branch, group.lang, group.format,
    group.startDate, group.days, group.morning, group.evening
  );
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(waText)}`;

  const fmtStyle = formatStyle(group.format);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="flex flex-col rounded-3xl p-6 h-full"
      style={{ background: "#FFFFFF", border: "1px solid #F1F5F9", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
    >
      {/* ── Badges row ── */}
      <div className="flex items-center justify-between mb-5 gap-2">
        {/* Lang */}
        <span
          className="text-xs font-black px-3 py-1 rounded-full tracking-wider"
          style={{
            background: group.lang === "RU" ? "#2563EB" : "#059669",
            color: "#FFFFFF",
          }}
        >
          {group.lang}
        </span>
        {/* Format */}
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5"
          style={{ background: fmtStyle.bg, color: fmtStyle.color }}
        >
          <span aria-hidden>{fmtStyle.icon}</span>
          {group.format}
        </span>
      </div>

      {/* ── Date ── */}
      <div
        className="font-black leading-none mb-1"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.2rem)", color: "#111827", letterSpacing: "-0.03em" }}
      >
        {group.startDate}
      </div>
      <div className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "#9CA3AF" }}>
        {g.startDate}
      </div>

      {/* ── Details ── */}
      <div className="flex flex-col gap-2.5 mb-6 flex-1">
        {/* Days */}
        {group.days && (
          <div className="flex items-center gap-2.5 text-sm" style={{ color: "#374151" }}>
            <span className="w-5 text-center text-base" aria-hidden>📆</span>
            <span className="font-medium">{group.days}</span>
          </div>
        )}
        {/* Morning */}
        {group.morning && (
          <div className="flex items-center gap-2.5 text-sm" style={{ color: "#374151" }}>
            <span className="w-5 text-center text-base" aria-hidden>🌅</span>
            <span>
              <span className="font-semibold" style={{ color: "#9CA3AF" }}>{g.morning}: </span>
              {group.morning}
            </span>
          </div>
        )}
        {/* Evening */}
        {group.evening && (
          <div className="flex items-center gap-2.5 text-sm" style={{ color: "#374151" }}>
            <span className="w-5 text-center text-base" aria-hidden>🌆</span>
            <span>
              <span className="font-semibold" style={{ color: "#9CA3AF" }}>{g.evening}: </span>
              {group.evening}
            </span>
          </div>
        )}
        {/* Branch */}
        <div className="flex items-center gap-2.5 text-sm" style={{ color: "#374151" }}>
          <span className="w-5 text-center text-base" aria-hidden>📍</span>
          <span className="font-semibold">{group.branch}</span>
        </div>
      </div>

      {/* ── CTA ── */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full rounded-2xl text-sm font-bold py-3.5 transition-all"
        style={{
          background: "#E11D48",
          color: "#FFFFFF",
          boxShadow: "0 4px 14px rgba(225,29,72,0.3)",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#BE123C")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#E11D48")}
      >
        {/* WhatsApp icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
        {g.enroll}
      </a>
    </motion.div>
  );
}

/* ─── Tab button ─── */
function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 sm:flex-none px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-200"
      style={{
        background: active ? "#E11D48" : "#FFFFFF",
        color:      active ? "#FFFFFF" : "#6B7280",
        boxShadow:  active ? "0 4px 16px rgba(225,29,72,0.25)" : "0 1px 4px rgba(0,0,0,0.06)",
        border:     active ? "none" : "1px solid #F1F5F9",
      }}
    >
      {label}
    </button>
  );
}

/* ─── Main ─── */
const FORMATS = ["Оффлайн", "Дистанционно", "Выходного дня"] as const;
type Format = (typeof FORMATS)[number];

export default function GroupsSection() {
  const { t } = useLang();
  const g = t.groups;

  const [groups,    setGroups]    = useState<Group[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(false);
  const [activeTab, setActiveTab] = useState<Format>("Оффлайн");
  const [selBranch, setSelBranch] = useState("all");
  const [selLang,   setSelLang]   = useState<"all" | "RU" | "KZ">("all");

  const fetchGroups = () => {
    setLoading(true);
    setError(false);
    fetch("/api/groups")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data: Group[]) => { setGroups(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  };

  useEffect(() => { fetchGroups(); }, []);

  /* ── Reset filters on tab change ── */
  const switchTab = (fmt: Format) => {
    setActiveTab(fmt);
    setSelBranch("all");
    setSelLang("all");
  };

  /* ── Derived ── */
  const branches = Array.from(new Set(
    groups.filter((gr) => gr.format === activeTab).map((gr) => gr.branch)
  )).filter(Boolean);

  const filtered = groups.filter((gr) => {
    if (gr.format !== activeTab) return false;
    if (selBranch !== "all" && gr.branch !== selBranch) return false;
    if (selLang   !== "all" && gr.lang   !== selLang)   return false;
    return true;
  });

  const contactWaUrl = `https://wa.me/${DEFAULT_PHONE}?text=${encodeURIComponent(g.waMsgContact)}`;

  const tabLabels: Record<Format, string> = {
    "Оффлайн":       g.tabOffline,
    "Дистанционно":  g.tabOnline,
    "Выходного дня": g.tabWeekend,
  };

  return (
    <section id="groups" className="py-12 sm:py-24" style={{ background: "#F9FAFB" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="label-tag mb-5">{g.tag}</div>
          <h2
            className="font-black leading-tight mb-3"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#111827", letterSpacing: "-0.025em" }}
          >
            {g.title}
          </h2>
          <p className="text-sm max-w-lg" style={{ color: "#9CA3AF" }}>{g.subtitle}</p>
        </motion.div>

        {/* ── Tabs ── */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FORMATS.map((fmt) => (
            <Tab key={fmt} label={tabLabels[fmt]} active={activeTab === fmt} onClick={() => switchTab(fmt)} />
          ))}
        </div>

        {/* ── Filters ── */}
        {!loading && !error && groups.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {/* Branch filter */}
            {[{ id: "all", label: g.allFilter }, ...branches.map((b) => ({ id: b, label: b }))].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setSelBranch(id)}
                className="text-xs font-semibold px-4 py-1.5 rounded-full transition-all"
                style={{
                  background: selBranch === id ? "#111827" : "#FFFFFF",
                  color:      selBranch === id ? "#FFFFFF" : "#6B7280",
                  border:     selBranch === id ? "none" : "1px solid #E5E7EB",
                }}
              >
                {label}
              </button>
            ))}

            <div className="w-px h-5 mx-1" style={{ background: "#E5E7EB" }} />

            {/* Lang filter */}
            {(["all", "RU", "KZ"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setSelLang(l)}
                className="text-xs font-semibold px-4 py-1.5 rounded-full transition-all"
                style={{
                  background: selLang === l ? (l === "RU" ? "#2563EB" : l === "KZ" ? "#059669" : "#111827") : "#FFFFFF",
                  color:      selLang === l ? "#FFFFFF" : "#6B7280",
                  border:     selLang === l ? "none" : "1px solid #E5E7EB",
                }}
              >
                {l === "all" ? g.allFilter : l === "RU" ? g.langRU : g.langKZ}
              </button>
            ))}
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => <Skeleton key={i} />)}
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <p className="text-base font-semibold" style={{ color: "#374151" }}>{g.error}</p>
            <button
              onClick={fetchGroups}
              className="px-6 py-2.5 rounded-2xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: "#E11D48", color: "#FFFFFF" }}
            >
              {g.retry}
            </button>
          </div>
        )}

        {/* ── Cards or Empty ── */}
        {!loading && !error && (
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${activeTab}-${selBranch}-${selLang}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((group, i) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="flex"
                  >
                    <GroupCard group={group} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center justify-center py-16 gap-5 text-center rounded-3xl"
                style={{ background: "#FFFFFF", border: "1px solid #F1F5F9", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
              >
                <span style={{ fontSize: "3rem" }} aria-hidden>📋</span>
                <div>
                  <p className="text-base font-bold mb-1.5" style={{ color: "#111827" }}>{g.noGroups}</p>
                  <p className="text-sm" style={{ color: "#9CA3AF" }}>{g.noGroupsSub}</p>
                </div>
                <a
                  href={contactWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold transition-all"
                  style={{ background: "#E11D48", color: "#FFFFFF", boxShadow: "0 4px 14px rgba(225,29,72,0.3)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#BE123C")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#E11D48")}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                  {g.contact}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        )}

      </div>
    </section>
  );
}
