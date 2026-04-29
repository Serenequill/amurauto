"use client";

import { useState, useMemo } from "react";
import { Calculator as CalcIcon, Plus, Minus } from "lucide-react";

const PACKAGES = [
  { id: "standart",      name: "Стандарт",  base: 120000, included: 5,  perLesson: 9000 },
  { id: "standart-plus", name: "Стандарт+", base: 160000, included: 10, perLesson: 8500 },
  { id: "comfort",       name: "Комфорт",   base: 200000, included: 15, perLesson: 8300 },
];

export default function Calculator() {
  const [pkgId, setPkgId] = useState("standart-plus");
  const [extra, setExtra] = useState(0);

  const pkg = PACKAGES.find((p) => p.id === pkgId)!;
  const total = useMemo(() => pkg.base + extra * pkg.perLesson, [pkg, extra]);
  const fmt = (n: number) => n.toLocaleString("ru-RU");

  return (
    <section
      id="calculator"
      className="py-24 relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "rgba(204,255,0,0.025)", filter: "blur(130px)" }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div
            className="font-mono text-[11px] tracking-[0.25em] mb-3"
            style={{ color: "rgba(204,255,0,0.45)" }}
          >
            ◈ PRICE_CALCULATOR // COMPUTE_TOTAL
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Рассчитайте{" "}
            <span style={{ color: "#ccff00" }}>стоимость</span>
          </h2>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-5 gap-8"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(204,255,0,0.1)",
          }}
        >
          {/* Controls */}
          <div className="md:col-span-3 space-y-8">
            {/* Package picker */}
            <div>
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Выберите пакет
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PACKAGES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setPkgId(p.id); setExtra(0); }}
                    className="text-left rounded-xl p-4 transition-all"
                    style={
                      pkgId === p.id
                        ? {
                            background: "rgba(204,255,0,0.07)",
                            border: "1px solid rgba(204,255,0,0.4)",
                          }
                        : {
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }
                    }
                  >
                    <p
                      className="font-bold text-base"
                      style={{
                        color: pkgId === p.id ? "#ccff00" : "rgba(255,255,255,0.7)",
                      }}
                    >
                      {p.name}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {p.included} занятий
                    </p>
                    <p
                      className="font-black text-lg mt-2 font-mono"
                      style={{ color: pkgId === p.id ? "#ccff00" : "rgba(255,255,255,0.6)" }}
                    >
                      {fmt(p.base)} ₸
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Extra lessons */}
            <div>
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Дополнительные занятия
                <span
                  className="font-normal ml-2"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  ({fmt(pkg.perLesson)} ₸ за занятие)
                </span>
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setExtra(Math.max(0, extra - 1))}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                  style={{
                    border: "1px solid rgba(204,255,0,0.2)",
                    color: "rgba(204,255,0,0.6)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#ccff00";
                    (e.currentTarget as HTMLElement).style.color = "#ccff00";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(204,255,0,0.2)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(204,255,0,0.6)";
                  }}
                >
                  <Minus size={18} />
                </button>
                <div
                  className="flex-1 rounded-xl py-3 text-center"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <span className="text-3xl font-black text-white font-mono">{extra}</span>
                  <span
                    className="text-sm ml-2"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    занятий
                  </span>
                </div>
                <button
                  onClick={() => setExtra(extra + 1)}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                  style={{
                    border: "1px solid rgba(204,255,0,0.2)",
                    color: "rgba(204,255,0,0.6)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#ccff00";
                    (e.currentTarget as HTMLElement).style.color = "#ccff00";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(204,255,0,0.2)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(204,255,0,0.6)";
                  }}
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                {[0, 3, 5, 10].map((n) => (
                  <button
                    key={n}
                    onClick={() => setExtra(n)}
                    className="text-xs px-3 py-1.5 rounded-full transition-all font-mono"
                    style={
                      extra === n
                        ? { background: "#ccff00", color: "#050505" }
                        : {
                            background: "rgba(204,255,0,0.05)",
                            border: "1px solid rgba(204,255,0,0.15)",
                            color: "rgba(204,255,0,0.5)",
                          }
                    }
                  >
                    +{n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result panel */}
          <div
            className="md:col-span-2 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
            style={{
              background: "rgba(204,255,0,0.07)",
              border: "1px solid rgba(204,255,0,0.3)",
            }}
          >
            <div
              className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: "rgba(204,255,0,0.06)", filter: "blur(30px)" }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <CalcIcon size={16} style={{ color: "#ccff00" }} />
                <span
                  className="text-sm font-semibold font-mono"
                  style={{ color: "rgba(204,255,0,0.65)" }}
                >
                  ИТОГО
                </span>
              </div>
              <p
                className="text-5xl font-black font-mono leading-none"
                style={{
                  color: "#ccff00",
                  textShadow: "0 0 30px rgba(204,255,0,0.35)",
                }}
              >
                {fmt(total)}
              </p>
              <p
                className="text-2xl font-black mt-1"
                style={{ color: "rgba(204,255,0,0.5)" }}
              >
                тенге
              </p>

              <div
                className="mt-6 pt-5 space-y-2 text-sm"
                style={{ borderTop: "1px solid rgba(204,255,0,0.15)" }}
              >
                <div
                  className="flex justify-between"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  <span>{pkg.name}</span>
                  <span>{fmt(pkg.base)} ₸</span>
                </div>
                {extra > 0 && (
                  <div
                    className="flex justify-between"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <span>+{extra} занятий</span>
                    <span>{fmt(extra * pkg.perLesson)} ₸</span>
                  </div>
                )}
              </div>
            </div>

            <a
              href="#contacts"
              className="relative mt-6 block text-center font-bold py-3 rounded-xl transition-all"
              style={{ background: "#ccff00", color: "#050505" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 22px rgba(204,255,0,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Записаться
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
