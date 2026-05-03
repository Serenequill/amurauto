"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Car, ShieldCheck } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const AWARDS = [
  { id: 1, caption: "Лучшая автошкола · 2013", issuer: "ДВД г. Алматы",     photo: "/awards/IMG_8059.jpg" },
  { id: 2, caption: "Лучшая автошкола · 2014", issuer: "УАП ДВД г. Алматы", photo: "/awards/IMG_8065.jpg" },
  { id: 3, caption: "Лучшая автошкола · 2015", issuer: "ДВД г. Алматы",     photo: "/awards/IMG_8066.jpg" },
  { id: 4, caption: "Лучшая автошкола · 2023", issuer: "ПШ ОАП г. Алматы",  photo: "/awards/IMG_8074.jpg" },
  { id: 5, caption: "Лучшая автошкола · 2024", issuer: "УАП г. Алматы",     photo: "/awards/IMG_8083.jpg" },
];

const BENTO_ICONS = [Clock, Car, ShieldCheck];

type AwardItem = (typeof AWARDS)[0];

/* ─── Lightbox ─── */
function Lightbox({ award, onClose }: { award: AwardItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(10,10,15,0.88)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.86, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 12 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="relative flex flex-col items-center"
        style={{ maxWidth: "420px", width: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-5 -right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all"
          style={{ background: "#FFFFFF", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}
        >
          <X size={16} style={{ color: "#374151" }} />
        </button>

        <div
          className="relative w-full rounded-3xl overflow-hidden"
          style={{ aspectRatio: "3/4", boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 60px rgba(225,29,72,0.15)" }}
        >
          <Image src={award.photo} alt={award.caption} fill className="object-cover object-top" quality={95} />
        </div>

        <div className="mt-5 text-center">
          <p className="font-bold text-sm" style={{ color: "#FFFFFF" }}>{award.caption}</p>
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>{award.issuer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Award card ─── */
function AwardCard({
  award,
  onClick,
  dimmed,
  onHover,
  onLeave,
  openLabel,
}: {
  award: AwardItem;
  onClick: () => void;
  dimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
  openLabel: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col gap-3 shrink-0"
      style={{
        width: "190px",
        opacity: dimmed ? 0.45 : 1,
        transition: "opacity 0.28s ease",
      }}
      onMouseEnter={() => { setHovered(true); onHover(); }}
      onMouseLeave={() => { setHovered(false); onLeave(); }}
    >
      <div
        className="relative w-full overflow-hidden cursor-pointer"
        style={{
          aspectRatio: "3/4",
          borderRadius: "1.5rem",
          background: "#FFFFFF",
          transition: "transform 0.28s ease, box-shadow 0.28s ease",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          boxShadow: hovered
            ? "0 0 0 2px rgba(225,29,72,0.5), 0 16px 48px rgba(0,0,0,0.16), 0 0 32px rgba(225,29,72,0.2)"
            : "0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08)",
        }}
        onClick={onClick}
      >
        <Image src={award.photo} alt={award.caption} fill className="object-cover object-top" />

        <div
          className="absolute inset-0 flex items-end justify-center pb-4"
          style={{
            opacity: hovered ? 1 : 0,
            background: hovered ? "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" : "transparent",
            transition: "opacity 0.22s ease",
          }}
        >
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)", color: "#FFFFFF", backdropFilter: "blur(6px)" }}
          >
            {openLabel}
          </span>
        </div>
      </div>

      <div className="text-center px-1">
        <p className="text-xs font-bold leading-snug" style={{ color: "#374151" }}>{award.caption}</p>
        <p className="text-[10px] mt-0.5 font-medium" style={{ color: "#9CA3AF" }}>{award.issuer}</p>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function Awards() {
  const { t } = useLang();
  const aw = t.awards;

  const [selected, setSelected] = useState<AwardItem | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const doubled = [...AWARDS, ...AWARDS];

  return (
    <>
      <section id="awards" className="py-12 sm:py-24" style={{ background: "#F9FAFB" }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12"
        >
          <div className="label-tag mb-5">{aw.tag}</div>
          <h2
            className="font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#111827", letterSpacing: "-0.025em" }}
          >
            {aw.title}
          </h2>
          <p className="text-sm mt-3 max-w-lg" style={{ color: "#9CA3AF" }}>
            {aw.subtitle}
          </p>
        </motion.div>

        {/* ── Bento stats blocks ── */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-8">
          <div className="grid grid-cols-3 gap-4">
            {aw.bentoStats.map(({ value, label }, i) => {
              const Icon = BENTO_ICONS[i];
              return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center justify-center text-center p-3 sm:p-6 lg:p-8"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "1.75rem",
                  border: "1px solid #F1F5F9",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                  aspectRatio: "1 / 1",
                }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-xl mb-4"
                  style={{ background: "rgba(225,29,72,0.07)", border: "1px solid rgba(225,29,72,0.14)" }}
                >
                  <Icon size={20} style={{ color: "#E11D48" }} />
                </div>
                <div
                  className="font-black leading-none mb-1.5"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", color: "#111827", letterSpacing: "-0.02em" }}
                >
                  {value}
                </div>
                <div className="text-[11px] font-medium leading-snug" style={{ color: "#9CA3AF" }}>{label}</div>
              </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── License block ── */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-7 py-6"
            style={{
              background: "#FFFFFF",
              borderRadius: "2rem",
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
            }}
          >
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                {/* Pulsing dot */}
                <span className="relative flex w-2.5 h-2.5 shrink-0">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                    style={{ background: "#E11D48" }}
                  />
                  <span
                    className="relative inline-flex rounded-full w-2.5 h-2.5"
                    style={{ background: "#E11D48" }}
                  />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#E11D48" }}>
                  {aw.licenseActive}
                </span>
              </div>
              <p className="font-black text-lg" style={{ color: "#111827", letterSpacing: "-0.02em" }}>
                {aw.licenseTitle}
              </p>
              <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                {aw.licenseDesc}
              </p>
            </div>
            <div
              className="shrink-0 px-5 py-3 rounded-2xl text-center"
              style={{ background: "#F9FAFB", border: "1px solid #F1F5F9" }}
            >
              <p className="mono text-[10px] mb-1" style={{ color: "#9CA3AF" }}>{aw.categoryLabel}</p>
              <p className="font-black text-2xl" style={{ color: "#111827", letterSpacing: "-0.02em" }}>B</p>
            </div>
          </motion.div>
        </div>

        {/* ── Awards carousel ── */}
        <div
          className="overflow-hidden"
          onMouseLeave={() => setHoveredId(null)}
        >
          <div
            className="awards-track flex gap-5 w-max"
            style={{ paddingLeft: "24px", paddingRight: "24px" }}
            onMouseEnter={(e) => e.currentTarget.classList.add("paused")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("paused")}
          >
            {doubled.map((award, i) => (
              <AwardCard
                key={`${award.id}-${i}`}
                award={award}
                onClick={() => setSelected(award)}
                dimmed={hoveredId !== null && hoveredId !== award.id}
                onHover={() => setHoveredId(award.id)}
                onLeave={() => setHoveredId(null)}
                openLabel={aw.open}
              />
            ))}
          </div>
        </div>

      </section>

      <AnimatePresence>
        {selected && <Lightbox award={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
