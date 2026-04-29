"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   Добавляйте грамоты и сертификаты сюда.
   photo — путь к файлу в /public/awards/
──────────────────────────────────────────────────────────*/
const AWARDS = [
  {
    id: 1,
    caption: "Лучшая автошкола · 2013",
    issuer: "ДВД г. Алматы",
    photo: "/awards/IMG_8059.jpg",
  },
  {
    id: 2,
    caption: "Лучшая автошкола · 2014",
    issuer: "УАП ДВД г. Алматы",
    photo: "/awards/IMG_8065.jpg",
  },
  {
    id: 3,
    caption: "Лучшая автошкола · 2015",
    issuer: "ДВД г. Алматы",
    photo: "/awards/IMG_8066.jpg",
  },
  {
    id: 4,
    caption: "Лучшая автошкола · 2023",
    issuer: "ПШ ОАП г. Алматы",
    photo: "/awards/IMG_8074.jpg",
  },
  {
    id: 5,
    caption: "Лучшая автошкола · 2024",
    issuer: "УАП г. Алматы",
    photo: "/awards/IMG_8083.jpg",
  },
];

type AwardItem = (typeof AWARDS)[0];

/* ── Stagger variants for the grid container ── */
const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

/* ── Modal / Lightbox ── */
function Lightbox({ award, onClose }: { award: AwardItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(10,10,15,0.85)", backdropFilter: "blur(16px)" }}
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
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-5 -right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all"
          style={{ background: "#FFFFFF", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F3F4F6"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}
        >
          <X size={16} style={{ color: "#374151" }} />
        </button>

        {/* Image */}
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{
            aspectRatio: "3/4",
            boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 60px rgba(225,29,72,0.15)",
          }}
        >
          <Image
            src={award.photo}
            alt={award.caption}
            fill
            className="object-cover object-top"
            quality={95}
          />
        </div>

        {/* Caption */}
        <div className="mt-5 text-center">
          <p className="font-bold text-sm" style={{ color: "#FFFFFF" }}>
            {award.caption}
          </p>
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
            {award.issuer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main section ── */
export default function Awards() {
  const [selected, setSelected] = useState<AwardItem | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <>
      <section id="awards" className="py-12 sm:py-24" style={{ background: "#F9FAFB" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <div className="label-tag mb-5">Достижения</div>
            <h2
              className="font-extrabold leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#111827", letterSpacing: "-0.02em" }}
            >
              Подтверждаем качество делом
            </h2>
            <p className="text-sm mt-3 max-w-lg" style={{ color: "#9CA3AF" }}>
              Лицензии, благодарственные письма и награды за 12 лет работы
            </p>
          </motion.div>

          {/* ── Stagger grid ── */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-5 gap-5"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {AWARDS.map((award) => (
              <motion.div
                key={award.id}
                variants={cardVariants}
                transition={{ duration: 0.55 }}
                className="flex flex-col gap-3"
              >
                {/* Card */}
                <motion.div
                  className="relative w-full rounded-2xl overflow-hidden cursor-pointer"
                  style={{ aspectRatio: "3/4" }}
                  animate={{
                    scale: hoveredId === award.id ? 1.08 : 1,
                    opacity: hoveredId !== null && hoveredId !== award.id ? 0.45 : 1,
                    boxShadow:
                      hoveredId === award.id
                        ? "0 0 0 1.5px rgba(225,29,72,0.5), 0 12px 40px rgba(0,0,0,0.14), 0 0 32px rgba(225,29,72,0.28)"
                        : "0 0 0 1px #E5E7EB, 0 4px 16px rgba(0,0,0,0.06), 0 0 0px rgba(225,29,72,0)",
                  }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  onHoverStart={() => setHoveredId(award.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={() => setSelected(award)}
                >
                  <Image
                    src={award.photo}
                    alt={award.caption}
                    fill
                    className="object-cover object-top"
                  />

                  {/* Zoom hint overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-end justify-center pb-4"
                    animate={{
                      opacity: hoveredId === award.id ? 1 : 0,
                      background:
                        hoveredId === award.id
                          ? "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)"
                          : "linear-gradient(to top, rgba(0,0,0,0) 0%, transparent 60%)",
                    }}
                    transition={{ duration: 0.22 }}
                  >
                    <span
                      className="text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.15)", color: "#FFFFFF", backdropFilter: "blur(6px)" }}
                    >
                      Открыть
                    </span>
                  </motion.div>
                </motion.div>

                {/* Caption */}
                <div className="text-center px-1">
                  <p className="text-xs font-bold leading-snug" style={{ color: "#374151" }}>
                    {award.caption}
                  </p>
                  <p className="text-[10px] mt-0.5 font-medium" style={{ color: "#9CA3AF" }}>
                    {award.issuer}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <Lightbox award={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
