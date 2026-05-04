"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LangContext";
import type { Group } from "@/app/api/groups/route";

/* ─────────────────────────────────────────
   Заглушка — используется если API не ответил
───────────────────────────────────────── */
const defaultGroups: Group[] = [
  {
    id: "d1", branch: "Аксай-1",   lang: "RU",
    format: "Оффлайн",       days: "вт, чт, сб",
    morning: "10:00–12:00",  evening: "19:00–21:00",
    startDate: "2 июня",
  },
  {
    id: "d2", branch: "Геологов",  lang: "KZ",
    format: "Оффлайн",       days: "пн, ср, пт",
    morning: "",             evening: "18:30–20:30",
    startDate: "5 июня",
  },
  {
    id: "d3", branch: "Жарокова",  lang: "RU",
    format: "Дистанционно",  days: "пн, ср, пт",
    morning: "09:00–11:00",  evening: "20:00–22:00",
    startDate: "10 июня",
  },
  {
    id: "d4", branch: "Аксай-1",   lang: "KZ",
    format: "Выходного дня", days: "сб, вс",
    morning: "10:00–14:00",  evening: "",
    startDate: "7 июня",
  },
  {
    id: "d5", branch: "Толе би",   lang: "RU",
    format: "Дистанционно",  days: "вт, чт",
    morning: "",             evening: "19:00–21:00",
    startDate: "3 июня",
  },
  {
    id: "d6", branch: "Акан Серы", lang: "KZ",
    format: "Выходного дня", days: "сб, вс",
    morning: "11:00–15:00",  evening: "",
    startDate: "8 июня",
  },
];

/* ─────────────────────────────────────────
   WhatsApp routing
───────────────────────────────────────── */
const PHONES: Record<string, string> = {
  "аксай":  "77772001660",
  "геолог": "77075606911",
  "акан":   "77772511115",
  "жарок":  "77071515991",
  "толе":   "77776667096",
  "лидер":  "77478101035",
};
const DEFAULT_PHONE = "77776667096";

function getPhone(branch: string) {
  const b = branch.toLowerCase();
  for (const [k, v] of Object.entries(PHONES)) if (b.includes(k)) return v;
  return DEFAULT_PHONE;
}

/* ─────────────────────────────────────────
   Визуальные стили форматов
───────────────────────────────────────── */
const FMT: Record<string, { bg: string; color: string; dot: string }> = {
  "Оффлайн":       { bg: "#F1F5F9", color: "#475569", dot: "#94A3B8" },
  "Дистанционно":  { bg: "rgba(99,102,241,0.08)", color: "#6366F1", dot: "#818CF8" },
  "Выходного дня": { bg: "rgba(245,158,11,0.09)", color: "#B45309", dot: "#F59E0B" },
};

const FORMATS = ["Оффлайн", "Дистанционно", "Выходного дня"] as const;
type FormatT = (typeof FORMATS)[number];

/* ─────────────────────────────────────────
   Карточка группы
───────────────────────────────────────── */
function Card({ group }: { group: Group }) {
  const { t } = useLang();
  const g = t.groups;

  const hasBoth  = !!(group.morning && group.evening);
  const [pick, setPick] = useState<"morning" | "evening">(
    group.morning ? "morning" : "evening"
  );

  const chosenTime = hasBoth
    ? (pick === "morning" ? group.morning : group.evening)
    : (group.morning || group.evening);

  const timeLabel = hasBoth
    ? (pick === "morning" ? `${g.morning} ${chosenTime}` : `${g.evening} ${chosenTime}`)
    : chosenTime;

  const phone = getPhone(group.branch);
  const waText = g.waMsg(
    group.branch, group.lang, group.format,
    group.startDate, group.days,
    pick === "morning" ? group.morning : "",
    pick === "evening" ? group.evening : ""
  );
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(waText)}`;

  const fmt = FMT[group.format] ?? FMT["Оффлайн"];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="flex flex-col"
      style={{
        background: "#FFFFFF",
        borderRadius: "2.5rem",
        border: "1px solid #F1F5F9",
        boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
        padding: "1.75rem",
      }}
    >
      {/* ── Top badges ── */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-[11px] font-black tracking-wider px-3 py-1 rounded-full"
          style={{
            background: group.lang === "RU" ? "#DBEAFE" : "#D1FAE5",
            color:      group.lang === "RU" ? "#1D4ED8" : "#065F46",
          }}
        >
          {group.lang}
        </span>
        <span
          className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full"
          style={{ background: fmt.bg, color: fmt.color }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: fmt.dot }}
          />
          {group.format}
        </span>
      </div>

      {/* ── Date ── */}
      <div
        className="font-black leading-none tracking-tight mb-1"
        style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", color: "#0F172A" }}
      >
        {group.startDate}
      </div>
      <div className="text-[11px] font-semibold uppercase tracking-widest mb-5" style={{ color: "#CBD5E1" }}>
        {g.startDate}
      </div>

      {/* ── Info rows ── */}
      <div className="flex flex-col gap-2 mb-5 flex-1">
        <InfoRow icon="📍" text={group.branch} bold />
        {group.days && <InfoRow icon="📆" text={group.days} />}
      </div>

      {/* ── Time selector ── */}
      {hasBoth ? (
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-2.5" style={{ color: "#94A3B8" }}>
            Выбери время
          </p>
          <div className="flex gap-2">
            {[
              { key: "morning" as const, label: `🌅 ${group.morning}` },
              { key: "evening" as const, label: `🌆 ${group.evening}` },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setPick(key)}
                className="flex-1 py-2 px-3 rounded-2xl text-xs font-bold transition-all duration-200"
                style={{
                  background: pick === key ? "#0F172A" : "#F8FAFC",
                  color:      pick === key ? "#FFFFFF"  : "#64748B",
                  border:     pick === key ? "none" : "1px solid #E2E8F0",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        chosenTime && (
          <div
            className="flex items-center gap-2 mb-5 px-4 py-2.5 rounded-2xl"
            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
          >
            <span aria-hidden>{group.morning ? "🌅" : "🌆"}</span>
            <span className="text-sm font-semibold" style={{ color: "#374151" }}>{chosenTime}</span>
          </div>
        )
      )}

      {/* ── CTA ── */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 w-full rounded-2xl text-sm font-bold py-3.5 transition-all duration-200"
        style={{
          background: "#E11D48",
          color: "#FFFFFF",
          boxShadow: "0 4px 16px rgba(225,29,72,0.28)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#BE123C";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(225,29,72,0.38)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#E11D48";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(225,29,72,0.28)";
        }}
      >
        <WaIcon />
        {g.enroll}
        {hasBoth && timeLabel && (
          <span className="opacity-75 font-normal text-xs">· {timeLabel}</span>
        )}
      </a>
    </motion.div>
  );
}

/* ── Helper ── */
function InfoRow({ icon, text, bold }: { icon: string; text: string; bold?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 text-sm" style={{ color: "#374151" }}>
      <span className="text-base w-5 text-center" aria-hidden>{icon}</span>
      <span className={bold ? "font-semibold" : ""}>{text}</span>
    </div>
  );
}

function WaIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
}

/* ─────────────────────────────────────────
   Скелетон
───────────────────────────────────────── */
function Skeleton() {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "2.5rem",
        border: "1px solid #F1F5F9",
        padding: "1.75rem",
      }}
    >
      <div className="flex justify-between mb-5">
        <div className="animate-pulse rounded-full h-6 w-10" style={{ background: "#E2E8F0" }} />
        <div className="animate-pulse rounded-full h-6 w-28" style={{ background: "#E2E8F0" }} />
      </div>
      <div className="animate-pulse rounded-2xl h-12 w-32 mb-1" style={{ background: "#F1F5F9" }} />
      <div className="animate-pulse rounded-xl h-3 w-20 mb-6" style={{ background: "#F8FAFC" }} />
      {[70, 55].map((w, i) => (
        <div key={i} className="animate-pulse rounded-lg h-4 mb-2" style={{ background: "#F1F5F9", width: `${w}%` }} />
      ))}
      <div className="animate-pulse rounded-2xl h-11 mt-5" style={{ background: "#E2E8F0" }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   Filter pill
───────────────────────────────────────── */
function Pill({
  label, active, color, onClick,
}: {
  label: string; active: boolean;
  color?: { bg: string; text: string };
  onClick: () => void;
}) {
  const activeBg   = color?.bg   ?? "#0F172A";
  const activeText = color?.text ?? "#FFFFFF";
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200"
      style={{
        background: active ? activeBg : "#F8FAFC",
        color:      active ? activeText : "#64748B",
        border:     active ? "none" : "1px solid #E2E8F0",
        boxShadow:  active ? "0 2px 8px rgba(0,0,0,0.12)" : "none",
      }}
    >
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────
   Main
───────────────────────────────────────── */
export default function GroupSchedule() {
  const { t } = useLang();
  const g = t.groups;

  const [groups,  setGroups]  = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [selFmt,  setSelFmt]  = useState<FormatT | "all">("all");
  const [selLang, setSelLang] = useState<"all" | "RU" | "KZ">("all");

  useEffect(() => {
    fetch("/api/groups")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data: Group[]) => setGroups(data.length ? data : defaultGroups))
      .catch(() => setGroups(defaultGroups))
      .finally(() => setLoading(false));
  }, []);

  /* ── Filtered list ── */
  const filtered = groups.filter((gr) => {
    if (selFmt  !== "all" && gr.format !== selFmt)  return false;
    if (selLang !== "all" && gr.lang   !== selLang) return false;
    return true;
  });

  const tabLabels: Record<FormatT, string> = {
    "Оффлайн":       g.tabOffline,
    "Дистанционно":  g.tabOnline,
    "Выходного дня": g.tabWeekend,
  };

  const contactWaUrl = `https://wa.me/${DEFAULT_PHONE}?text=${encodeURIComponent(g.waMsgContact)}`;

  return (
    <section id="groups" className="py-12 sm:py-24" style={{ background: "#F8FAFC" }}>
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
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0F172A", letterSpacing: "-0.03em" }}
          >
            {g.title}
          </h2>
          <p className="text-sm max-w-md" style={{ color: "#94A3B8" }}>{g.subtitle}</p>
        </motion.div>

        {/* ── Filters ── */}
        <div className="flex flex-col gap-3 mb-8">
          {/* Format row */}
          <div className="flex flex-wrap gap-2">
            <Pill
              label={g.allFilter}
              active={selFmt === "all"}
              onClick={() => setSelFmt("all")}
            />
            {FORMATS.map((fmt) => (
              <Pill
                key={fmt}
                label={tabLabels[fmt]}
                active={selFmt === fmt}
                color={
                  fmt === "Дистанционно"  ? { bg: "#6366F1", text: "#FFF" } :
                  fmt === "Выходного дня" ? { bg: "#D97706", text: "#FFF" } :
                                            { bg: "#0F172A", text: "#FFF" }
                }
                onClick={() => setSelFmt(fmt)}
              />
            ))}

            {/* divider */}
            <div className="w-px mx-1 self-stretch" style={{ background: "#E2E8F0" }} />

            {/* Lang row inline */}
            {(["all", "RU", "KZ"] as const).map((l) => (
              <Pill
                key={l}
                label={l === "all" ? g.allFilter : l === "RU" ? g.langRU : g.langKZ}
                active={selLang === l}
                color={
                  l === "RU" ? { bg: "#1D4ED8", text: "#FFF" } :
                  l === "KZ" ? { bg: "#065F46", text: "#FFF" } :
                               { bg: "#0F172A", text: "#FFF" }
                }
                onClick={() => setSelLang(l)}
              />
            ))}
          </div>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => <Skeleton key={i} />)}
          </div>
        )}

        {/* ── Cards ── */}
        {!loading && (
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((group, i) => (
                  <motion.div
                    key={group.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="flex"
                  >
                    <Card group={group} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* ── Empty state ── */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center justify-center py-20 gap-5 text-center"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "2.5rem",
                  border: "1px solid #F1F5F9",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
                }}
              >
                <span style={{ fontSize: "3rem" }} aria-hidden>📋</span>
                <div>
                  <p className="text-base font-bold mb-1.5" style={{ color: "#0F172A" }}>{g.noGroups}</p>
                  <p className="text-sm" style={{ color: "#94A3B8" }}>{g.noGroupsSub}</p>
                </div>
                <a
                  href={contactWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold transition-all"
                  style={{ background: "#E11D48", color: "#FFFFFF", boxShadow: "0 4px 14px rgba(225,29,72,0.28)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#BE123C")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#E11D48")}
                >
                  <WaIcon />
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
