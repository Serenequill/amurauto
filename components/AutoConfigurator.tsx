"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Car, Clock, Trophy } from "lucide-react";

/* ─────────── SVG Vehicle Outlines ─────────── */

function CarSVG() {
  return (
    <svg viewBox="0 0 440 180" fill="none" className="w-full h-full">
      {/* Main body */}
      <path
        d="M 45 120 L 45 92 Q 65 92 82 70 L 122 48 Q 148 32 188 30 L 270 30 Q 308 30 335 52 L 368 76 Q 382 86 382 100 L 382 120 Z"
        stroke="#ccff00" strokeWidth="1.5" fill="rgba(204,255,0,0.04)" strokeLinejoin="round"
      />
      {/* Cabin / roof */}
      <path
        d="M 118 74 L 144 46 Q 164 30 194 28 L 266 28 Q 300 28 322 50 L 345 74 Z"
        stroke="rgba(204,255,0,0.3)" strokeWidth="1" fill="rgba(204,255,0,0.025)"
      />
      {/* Center pillar */}
      <line x1="220" y1="30" x2="220" y2="74" stroke="rgba(204,255,0,0.18)" strokeWidth="1" />
      {/* Rear wheel */}
      <circle cx="108" cy="128" r="28" stroke="#ccff00" strokeWidth="1.5" fill="rgba(204,255,0,0.04)" />
      <circle cx="108" cy="128" r="15" stroke="rgba(204,255,0,0.35)" strokeWidth="1" fill="none" />
      <circle cx="108" cy="128" r="5" fill="#ccff00" />
      {/* Spokes */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const r = Math.PI * deg / 180;
        return (
          <line key={deg}
            x1={108 + 5 * Math.cos(r)} y1={128 + 5 * Math.sin(r)}
            x2={108 + 15 * Math.cos(r)} y2={128 + 15 * Math.sin(r)}
            stroke="rgba(204,255,0,0.25)" strokeWidth="1"
          />
        );
      })}
      {/* Front wheel */}
      <circle cx="318" cy="128" r="28" stroke="#ccff00" strokeWidth="1.5" fill="rgba(204,255,0,0.04)" />
      <circle cx="318" cy="128" r="15" stroke="rgba(204,255,0,0.35)" strokeWidth="1" fill="none" />
      <circle cx="318" cy="128" r="5" fill="#ccff00" />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const r = Math.PI * deg / 180;
        return (
          <line key={deg}
            x1={318 + 5 * Math.cos(r)} y1={128 + 5 * Math.sin(r)}
            x2={318 + 15 * Math.cos(r)} y2={128 + 15 * Math.sin(r)}
            stroke="rgba(204,255,0,0.25)" strokeWidth="1"
          />
        );
      })}
      {/* Headlight */}
      <rect x="372" y="92" width="14" height="16" rx="3" stroke="#ccff00" strokeWidth="1" fill="rgba(204,255,0,0.15)" />
      {/* Tail light */}
      <rect x="38" y="95" width="12" height="14" rx="3" stroke="rgba(204,255,0,0.45)" strokeWidth="1" fill="rgba(204,255,0,0.06)" />
      {/* Ground line */}
      <line x1="45" y1="156" x2="382" y2="156" stroke="rgba(204,255,0,0.12)" strokeWidth="0.5" />
      {/* Dimension */}
      <line x1="45" y1="166" x2="382" y2="166" stroke="rgba(204,255,0,0.18)" strokeWidth="0.5" strokeDasharray="4 5" />
      <line x1="45" y1="161" x2="45" y2="171" stroke="rgba(204,255,0,0.18)" strokeWidth="0.5" />
      <line x1="382" y1="161" x2="382" y2="171" stroke="rgba(204,255,0,0.18)" strokeWidth="0.5" />
      <text x="213" y="178" textAnchor="middle" fill="rgba(204,255,0,0.28)" fontSize="8" fontFamily="monospace">4500 mm</text>
    </svg>
  );
}

function MotorcycleSVG() {
  return (
    <svg viewBox="0 0 440 200" fill="none" className="w-full h-full">
      {/* Rear frame */}
      <path d="M 140 110 L 185 65 L 250 65" stroke="#ccff00" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <line x1="185" y1="65" x2="165" y2="110" stroke="#ccff00" strokeWidth="1.5" />
      {/* Engine block */}
      <rect x="178" y="95" width="58" height="34" rx="5" stroke="rgba(204,255,0,0.4)" strokeWidth="1" fill="rgba(204,255,0,0.03)" />
      {/* Fuel tank / body */}
      <path d="M 250 65 L 290 45 L 320 65 L 290 110" stroke="#ccff00" strokeWidth="1.5" fill="rgba(204,255,0,0.04)" strokeLinejoin="round" />
      {/* Front fork */}
      <line x1="318" y1="65" x2="348" y2="110" stroke="#ccff00" strokeWidth="2" />
      <line x1="305" y1="65" x2="335" y2="110" stroke="rgba(204,255,0,0.45)" strokeWidth="1" />
      {/* Handlebar */}
      <path d="M 298 40 Q 308 34 320 40" stroke="#ccff00" strokeWidth="1.5" fill="none" />
      {/* Seat */}
      <path d="M 200 65 Q 240 57 265 65" stroke="rgba(204,255,0,0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Exhaust */}
      <path d="M 180 118 Q 155 118 148 135" stroke="rgba(204,255,0,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Rear wheel */}
      <circle cx="148" cy="140" r="32" stroke="#ccff00" strokeWidth="1.5" fill="rgba(204,255,0,0.04)" />
      <circle cx="148" cy="140" r="18" stroke="rgba(204,255,0,0.3)" strokeWidth="1" fill="none" />
      <circle cx="148" cy="140" r="5" fill="#ccff00" />
      {/* Front wheel */}
      <circle cx="342" cy="140" r="32" stroke="#ccff00" strokeWidth="1.5" fill="rgba(204,255,0,0.04)" />
      <circle cx="342" cy="140" r="18" stroke="rgba(204,255,0,0.3)" strokeWidth="1" fill="none" />
      <circle cx="342" cy="140" r="5" fill="#ccff00" />
      {/* Headlight */}
      <circle cx="354" cy="78" r="10" stroke="#ccff00" strokeWidth="1" fill="rgba(204,255,0,0.1)" />
      {/* Dimension */}
      <line x1="116" y1="185" x2="365" y2="185" stroke="rgba(204,255,0,0.18)" strokeWidth="0.5" strokeDasharray="4 5" />
      <text x="240" y="196" textAnchor="middle" fill="rgba(204,255,0,0.28)" fontSize="8" fontFamily="monospace">2100 mm</text>
    </svg>
  );
}

function TruckSVG() {
  return (
    <svg viewBox="0 0 500 180" fill="none" className="w-full h-full">
      {/* Cab */}
      <path
        d="M 28 120 L 28 64 Q 28 44 48 42 L 128 42 Q 148 42 154 60 L 162 100 L 162 120 Z"
        stroke="#ccff00" strokeWidth="1.5" fill="rgba(204,255,0,0.04)" strokeLinejoin="round"
      />
      {/* Windshield */}
      <path d="M 34 64 L 34 46 L 122 46 L 136 64 Z" stroke="rgba(204,255,0,0.3)" strokeWidth="1" fill="rgba(204,255,0,0.02)" />
      {/* Trailer */}
      <rect x="162" y="54" width="306" height="66" rx="4" stroke="#ccff00" strokeWidth="1.5" fill="rgba(204,255,0,0.03)" />
      {/* Trailer vertical ribs */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={220 + i * 42} y1="54" x2={220 + i * 42} y2="120"
          stroke="rgba(204,255,0,0.1)" strokeWidth="0.5" />
      ))}
      {/* Cab front wheel */}
      <circle cx="82" cy="132" r="22" stroke="#ccff00" strokeWidth="1.5" fill="rgba(204,255,0,0.04)" />
      <circle cx="82" cy="132" r="12" stroke="rgba(204,255,0,0.35)" strokeWidth="1" fill="none" />
      <circle cx="82" cy="132" r="4" fill="#ccff00" />
      {/* Rear axle wheels (double) */}
      {[385, 406].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={132} r={20} stroke="#ccff00" strokeWidth={1.5} fill="rgba(204,255,0,0.04)" />
          <circle cx={cx} cy={132} r={10} stroke="rgba(204,255,0,0.3)" strokeWidth={1} fill="none" />
          <circle cx={cx} cy={132} r={3} fill="#ccff00" />
        </g>
      ))}
      {/* Mid axle */}
      <circle cx="285" cy="132" r="20" stroke="#ccff00" strokeWidth="1.5" fill="rgba(204,255,0,0.04)" />
      <circle cx="285" cy="132" r="10" stroke="rgba(204,255,0,0.3)" strokeWidth="1" fill="none" />
      <circle cx="285" cy="132" r="3" fill="#ccff00" />
      {/* Headlight */}
      <rect x="20" y="82" width="12" height="18" rx="3" stroke="#ccff00" strokeWidth="1" fill="rgba(204,255,0,0.15)" />
      {/* Dimension */}
      <line x1="28" y1="162" x2="468" y2="162" stroke="rgba(204,255,0,0.18)" strokeWidth="0.5" strokeDasharray="4 5" />
      <text x="248" y="173" textAnchor="middle" fill="rgba(204,255,0,0.28)" fontSize="8" fontFamily="monospace">12000 mm</text>
    </svg>
  );
}

/* ─────────── Categories data ─────────── */

const CATEGORIES = [
  {
    id: "B",
    label: "Категория B",
    vehicle: "Легковой автомобиль",
    description:
      "Основной курс автошколы. Теория, автодром и городское вождение. 2.5 месяца, 100% сдача ПДД, инструкторы с австрийскими сертификатами.",
    duration: "2.5 мес.",
    hours: "72 ч.",
    price: "от 120 000 ₸",
    features: ["Теория ПДД", "5–15 занятий практики", "Автодром + Город", "100% сдача экзамена"],
  },
  {
    id: "A",
    label: "Категория A",
    vehicle: "Мотоцикл",
    description:
      "Обучение управлению мотоциклом. Безопасное вождение, манёвры на автодроме, городское движение. Теоретический + практический курс.",
    duration: "1.5 мес.",
    hours: "48 ч.",
    price: "от 80 000 ₸",
    features: ["Теория ПДД", "Практика на мотодроме", "Городское движение", "Экзамен ПДД"],
  },
  {
    id: "C",
    label: "Категория C",
    vehicle: "Грузовой автомобиль",
    description:
      "Профессиональное управление грузовым транспортом. Расширенный курс вождения, спецманёвры, работа с прицепом.",
    duration: "3 мес.",
    hours: "96 ч.",
    price: "от 150 000 ₸",
    features: ["Теория ПДД (груз.)", "Спецманёвры", "Работа с прицепом", "Проф. экзамен"],
  },
];

export default function AutoConfigurator() {
  const [active, setActive] = useState("B");
  const cat = CATEGORIES.find((c) => c.id === active)!;

  return (
    <section
      id="courses"
      className="py-24 relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(204,255,0,0.025) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(204,255,0,0.025) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, #050505 75%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div
            className="font-mono text-[11px] tracking-[0.25em] mb-3"
            style={{ color: "rgba(204,255,0,0.45)" }}
          >
            ◈ AUTO_CONFIGURATOR // SELECT_CATEGORY
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Выберите{" "}
            <span style={{ color: "#ccff00" }}>категорию</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Tab buttons ── */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-3">
            {CATEGORIES.map((c) => {
              const on = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className="relative text-left px-6 py-5 rounded-2xl transition-all font-mono"
                  style={{
                    background: on ? "rgba(204,255,0,0.07)" : "rgba(255,255,255,0.02)",
                    border: on
                      ? "1px solid rgba(204,255,0,0.4)"
                      : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: on ? "0 0 24px rgba(204,255,0,0.08)" : "none",
                  }}
                >
                  <div
                    className="text-2xl font-black mb-0.5"
                    style={{ color: on ? "#ccff00" : "rgba(255,255,255,0.3)" }}
                  >
                    {c.id}
                  </div>
                  <div
                    className="text-[11px]"
                    style={{ color: on ? "rgba(204,255,0,0.65)" : "rgba(255,255,255,0.25)" }}
                  >
                    {c.label}
                  </div>
                  {on && (
                    <motion.div
                      layoutId="cat-indicator"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                      style={{ background: "#ccff00" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── SVG canvas ── */}
          <div
            className="lg:col-span-5 relative rounded-2xl p-8 flex items-center justify-center overflow-hidden"
            style={{
              background: "rgba(204,255,0,0.015)",
              border: "1px solid rgba(204,255,0,0.1)",
              minHeight: "260px",
            }}
          >
            {/* Corner brackets */}
            {([
              [0, 0], [1, 0], [0, 1], [1, 1],
            ] as [number, number][]).map(([sx, sy], i) => (
              <div
                key={i}
                className="absolute w-5 h-5 pointer-events-none"
                style={{
                  top: sy === 0 ? 14 : "auto",
                  bottom: sy === 1 ? 14 : "auto",
                  left: sx === 0 ? 14 : "auto",
                  right: sx === 1 ? 14 : "auto",
                  borderTop: sy === 0 ? "1px solid rgba(204,255,0,0.45)" : "none",
                  borderBottom: sy === 1 ? "1px solid rgba(204,255,0,0.45)" : "none",
                  borderLeft: sx === 0 ? "1px solid rgba(204,255,0,0.45)" : "none",
                  borderRight: sx === 1 ? "1px solid rgba(204,255,0,0.45)" : "none",
                }}
              />
            ))}

            {/* HUD label */}
            <div
              className="absolute top-4 left-0 right-0 text-center font-mono text-[9px]"
              style={{ color: "rgba(204,255,0,0.3)" }}
            >
              BLUEPRINT // CAT-{active}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.28 }}
                className="w-full"
              >
                {active === "B" ? (
                  <CarSVG />
                ) : active === "A" ? (
                  <MotorcycleSVG />
                ) : (
                  <TruckSVG />
                )}
              </motion.div>
            </AnimatePresence>

            <div
              className="absolute bottom-4 left-0 right-0 text-center font-mono text-[9px]"
              style={{ color: "rgba(204,255,0,0.35)" }}
            >
              {cat.vehicle.toUpperCase()} // TECHNICAL_DRAWING
            </div>
          </div>

          {/* ── Info panel ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.28 }}
              className="lg:col-span-4 space-y-5"
            >
              <div>
                <div
                  className="font-mono text-[10px] tracking-[0.2em] mb-2"
                  style={{ color: "rgba(204,255,0,0.4)" }}
                >
                  VEHICLE_TYPE
                </div>
                <h3 className="text-2xl font-black text-white mb-2">
                  {cat.vehicle}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {cat.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "DURATION", value: cat.duration },
                  { label: "HOURS", value: cat.hours },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl p-4"
                    style={{
                      background: "rgba(204,255,0,0.03)",
                      border: "1px solid rgba(204,255,0,0.1)",
                    }}
                  >
                    <div
                      className="font-mono text-[9px] tracking-[0.18em] mb-1"
                      style={{ color: "rgba(204,255,0,0.4)" }}
                    >
                      {item.label}
                    </div>
                    <div className="font-black text-white text-lg">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="space-y-2">
                {cat.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: "#ccff00" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: "rgba(204,255,0,0.06)",
                  border: "1px solid rgba(204,255,0,0.2)",
                }}
              >
                <div
                  className="font-mono text-[10px] tracking-[0.2em] mb-1"
                  style={{ color: "rgba(204,255,0,0.5)" }}
                >
                  СТОИМОСТЬ
                </div>
                <div
                  className="text-2xl font-black"
                  style={{ color: "#ccff00" }}
                >
                  {cat.price}
                </div>
              </div>

              {/* CTA */}
              <a
                href="#contacts"
                className="block text-center py-3.5 rounded-xl font-bold transition-all"
                style={{ background: "#ccff00", color: "#050505" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 24px rgba(204,255,0,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                Записаться на {cat.label}
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom info strip */}
        <div
          className="mt-12 rounded-2xl p-6 flex flex-wrap gap-6 items-center justify-between"
          style={{
            background: "rgba(204,255,0,0.03)",
            border: "1px solid rgba(204,255,0,0.1)",
          }}
        >
          {[
            { icon: BookOpen, label: "Теория ПДД в классах" },
            { icon: Car, label: "15 учебных автомобилей" },
            { icon: Trophy, label: "100% сдача экзамена" },
            { icon: Clock, label: "Гибкий график" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={18} style={{ color: "#ccff00" }} />
              <span
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
