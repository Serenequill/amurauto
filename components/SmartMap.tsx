"use client";

import { useState } from "react";
import { MapPin, Phone } from "lucide-react";

const BRANCHES = [
  {
    id: 1,
    tag: "01",
    name: "Толе би",
    address: "ул. Толе би, 214а",
    phones: ["+7 777 666-70-96"],
    x: 54,
    y: 52,
  },
  {
    id: 2,
    tag: "02",
    name: "Аксай",
    address: "мкр. Аксай-1, 15Б",
    phones: ["+7 777 200-16-60", "+7 727 317-03-43"],
    x: 18,
    y: 40,
  },
  {
    id: 3,
    tag: "03",
    name: "Жарокова",
    address: "ул. Жарокова, 322а",
    phones: ["+7 707 151-59-91"],
    x: 36,
    y: 28,
  },
  {
    id: 4,
    tag: "04",
    name: "Геологов",
    address: "ул. Геологов, 2/327, оф. 2",
    phones: ["+7 707 560-69-11"],
    x: 68,
    y: 34,
  },
  {
    id: 5,
    tag: "05",
    name: "Акан Серы",
    address: "ул. Акан Серы, 11",
    phones: ["+7 777 251-11-15"],
    x: 80,
    y: 60,
  },
];

export default function SmartMap() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* ── Filial list ── */}
      <div>
        <div
          className="font-mono text-[10px] tracking-[0.22em] mb-6"
          style={{ color: "rgba(204,255,0,0.4)" }}
        >
          ◈ BRANCH_LOCATOR // {BRANCHES.length} POINTS ACTIVE
        </div>
        <div className="space-y-3">
          {BRANCHES.map((b) => {
            const isActive = hovered === b.id;
            const isDimmed = hovered !== null && !isActive;
            return (
              <div
                key={b.id}
                onMouseEnter={() => setHovered(b.id)}
                onMouseLeave={() => setHovered(null)}
                className="rounded-xl p-5 transition-all duration-300 cursor-default"
                style={{
                  background: isActive
                    ? "rgba(204,255,0,0.05)"
                    : "rgba(255,255,255,0.02)",
                  border: isActive
                    ? "1px solid rgba(204,255,0,0.35)"
                    : "1px solid rgba(255,255,255,0.05)",
                  boxShadow: isActive
                    ? "0 0 20px rgba(204,255,0,0.08)"
                    : "none",
                  opacity: isDimmed ? 0.3 : 1,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-[10px]"
                      style={{
                        color: isActive
                          ? "#ccff00"
                          : "rgba(204,255,0,0.28)",
                      }}
                    >
                      [{b.tag}]
                    </span>
                    <span className="font-bold text-white text-sm">
                      {b.name}
                    </span>
                  </div>
                  {isActive && (
                    <span
                      className="w-2 h-2 rounded-full shrink-0 mt-0.5"
                      style={{
                        background: "#ccff00",
                        boxShadow: "0 0 8px rgba(204,255,0,0.9)",
                        animation: "status-blink 1.2s ease-in-out infinite",
                      }}
                    />
                  )}
                </div>
                <div className="flex items-start gap-2 mb-2">
                  <MapPin
                    size={13}
                    className="shrink-0 mt-0.5"
                    style={{
                      color: isActive
                        ? "#ccff00"
                        : "rgba(255,255,255,0.25)",
                    }}
                  />
                  <span
                    className="text-sm"
                    style={{
                      color: isActive
                        ? "rgba(255,255,255,0.75)"
                        : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {b.address}
                  </span>
                </div>
                {b.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\D/g, "")}`}
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{
                      color: isActive
                        ? "#ccff00"
                        : "rgba(255,255,255,0.25)",
                    }}
                  >
                    <Phone size={12} />
                    {p}
                  </a>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Stylized map widget ── */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(204,255,0,0.015)",
          border: "1px solid rgba(204,255,0,0.1)",
          minHeight: "420px",
        }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(204,255,0,0.045) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(204,255,0,0.045) 1px, transparent 1px)",
            ].join(","),
            backgroundSize: "38px 38px",
          }}
        />
        {/* Glow center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(204,255,0,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Labels */}
        <div
          className="absolute top-4 left-4 font-mono text-[9px]"
          style={{ color: "rgba(204,255,0,0.38)" }}
        >
          АЛМАТЫ · 43°14′N 76°54′E
        </div>
        <div
          className="absolute top-4 right-4 font-mono text-[9px] flex items-center gap-1.5"
          style={{ color: "rgba(204,255,0,0.28)" }}
        >
          <span
            className="w-1 h-1 rounded-full inline-block"
            style={{
              background: "#ccff00",
              animation: "status-blink 1.5s ease-in-out infinite",
            }}
          />
          SCANNING
        </div>

        {/* Branch pins */}
        {BRANCHES.map((b) => {
          const isActive = hovered === b.id;
          const isDimmed = hovered !== null && !isActive;
          return (
            <div
              key={b.id}
              className="absolute transition-all duration-300"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                transform: "translate(-50%, -50%)",
                opacity: isDimmed ? 0.18 : 1,
                zIndex: isActive ? 10 : 1,
              }}
              onMouseEnter={() => setHovered(b.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Ping ring */}
              {isActive && (
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: "-14px",
                    background: "rgba(204,255,0,0.15)",
                    animation: "lime-ping 1.4s ease-out infinite",
                  }}
                />
              )}
              {/* Pin dot */}
              <div
                className="relative w-4 h-4 rounded-full cursor-pointer"
                style={{
                  background: isActive ? "#ccff00" : "rgba(204,255,0,0.35)",
                  border: "1px solid rgba(204,255,0,0.8)",
                  boxShadow: isActive
                    ? "0 0 16px rgba(204,255,0,0.9)"
                    : "0 0 5px rgba(204,255,0,0.3)",
                }}
              />
              {/* Tooltip */}
              {isActive && (
                <div
                  className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded px-2.5 py-1 font-mono text-[10px] font-bold"
                  style={{ background: "#ccff00", color: "#050505" }}
                >
                  {b.name}
                </div>
              )}
            </div>
          );
        })}

        {/* Corner brackets */}
        {([
          [0, 0], [1, 0], [0, 1], [1, 1],
        ] as [number, number][]).map(([sx, sy], i) => (
          <div
            key={i}
            className="absolute w-5 h-5 pointer-events-none"
            style={{
              top: sy === 0 ? 12 : "auto",
              bottom: sy === 1 ? 12 : "auto",
              left: sx === 0 ? 12 : "auto",
              right: sx === 1 ? 12 : "auto",
              borderTop: sy === 0 ? "1px solid rgba(204,255,0,0.35)" : "none",
              borderBottom:
                sy === 1 ? "1px solid rgba(204,255,0,0.35)" : "none",
              borderLeft:
                sx === 0 ? "1px solid rgba(204,255,0,0.35)" : "none",
              borderRight:
                sx === 1 ? "1px solid rgba(204,255,0,0.35)" : "none",
            }}
          />
        ))}

        {/* Branch count */}
        <div
          className="absolute bottom-4 left-0 right-0 text-center font-mono text-[9px]"
          style={{ color: "rgba(204,255,0,0.28)" }}
        >
          {BRANCHES.length} FILIALS ACTIVE // ALM-KZ
        </div>
      </div>
    </div>
  );
}
