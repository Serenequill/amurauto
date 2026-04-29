"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const AWARDS = [
  { id: 1, caption: "Лучшая автошкола · 2013", issuer: "ДВД г. Алматы",     photo: "/awards/IMG_8059.jpg" },
  { id: 2, caption: "Лучшая автошкола · 2014", issuer: "УАП ДВД г. Алматы", photo: "/awards/IMG_8065.jpg" },
  { id: 3, caption: "Лучшая автошкола · 2015", issuer: "ДВД г. Алматы",     photo: "/awards/IMG_8066.jpg" },
  { id: 4, caption: "Лучшая автошкола · 2023", issuer: "ПШ ОАП г. Алматы",  photo: "/awards/IMG_8074.jpg" },
  { id: 5, caption: "Лучшая автошкола · 2024", issuer: "УАП г. Алматы",     photo: "/awards/IMG_8083.jpg" },
];

type AwardItem = (typeof AWARDS)[0];

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
        <button
          onClick={onClose}
          className="absolute -top-5 -right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all"
          style={{ background: "#FFFFFF", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}
        >
          <X size={16} style={{ color: "#374151" }} />
        </button>

        <div
          className="relative w-full rounded-2xl overflow-hidden"
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

function AwardCard({ award, onClick }: { award: AwardItem; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col gap-3 shrink-0"
      style={{ width: "190px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full rounded-2xl overflow-hidden cursor-pointer"
        style={{
          aspectRatio: "3/4",
          transition: "transform 0.28s ease, box-shadow 0.28s ease",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          boxShadow: hovered
            ? "0 0 0 1.5px rgba(225,29,72,0.5), 0 12px 40px rgba(0,0,0,0.14), 0 0 32px rgba(225,29,72,0.28)"
            : "0 0 0 1px #E5E7EB, 0 4px 16px rgba(0,0,0,0.06)",
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
            Открыть
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

export default function Awards() {
  const [selected, setSelected] = useState<AwardItem | null>(null);
  const doubled = [...AWARDS, ...AWARDS];

  return (
    <>
      <section id="awards" className="py-12 sm:py-24" style={{ background: "#F9FAFB" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-10"
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

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="awards-track flex gap-5 w-max"
            style={{ paddingLeft: "24px", paddingRight: "24px" }}
            onMouseEnter={(e) => e.currentTarget.classList.add("paused")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("paused")}
          >
            {doubled.map((award, i) => (
              <AwardCard key={`${award.id}-${i}`} award={award} onClick={() => setSelected(award)} />
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
