"use client";

import { motion } from "framer-motion";
import { Check, Users, MousePointerClick, ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

/* ─── Shadow tokens ─── */
const CARD_SHADOW =
  "0 2px 4px rgba(0,0,0,0.04), " +
  "0 8px 24px rgba(0,0,0,0.04), " +
  "0 32px 64px rgba(148,163,184,0.12), " +
  "inset 0 1px 0 rgba(255,255,255,0.95)";

const CARD_SHADOW_DARK =
  "0 2px 4px rgba(0,0,0,0.18), " +
  "0 12px 32px rgba(0,0,0,0.18), " +
  "0 40px 80px rgba(0,0,0,0.22), " +
  "inset 0 1px 0 rgba(255,255,255,0.07)";

const PROMO_ICONS = [Users, MousePointerClick];

/* ─── Arrow CTA button ─── */
function CTA({ dark, label }: { dark?: boolean; label: string }) {
  return (
    <motion.a
      href="#register"
      whileHover="hover"
      initial="rest"
      className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-black text-sm tracking-wide transition-all"
      style={
        dark
          ? {
              background: "linear-gradient(160deg,#C41E3A 0%,#9E1239 50%,#7D0E2D 100%)",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(158,18,57,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
            }
          : {
              background: "#111827",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }
      }
    >
      {label}
      <motion.span
        variants={{ rest: { x: 0 }, hover: { x: 5 } }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <ArrowRight size={15} />
      </motion.span>
    </motion.a>
  );
}

/* ══════════════════════════════════════════
   Component
══════════════════════════════════════════ */
export default function Pricing() {
  const { t } = useLang();
  const p = t.pricing;

  return (
    <section id="pricing" className="py-12 sm:py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="label-tag mb-5">{p.tag}</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              className="font-black leading-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", color: "#111827", letterSpacing: "-0.025em" }}
            >
              {p.title}
            </h2>
            <p className="text-sm" style={{ color: "#9CA3AF" }}>
              {p.subtitle}
            </p>
          </div>
        </motion.div>

        {/* ── Promo banners ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {p.promos.map((d, i) => {
            const PromoIcon = PROMO_ICONS[i];
            return (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-4 px-5 py-3"
              style={{
                background: "#FFFFFF",
                border: "1px solid #F1F5F9",
                borderRadius: "1.5rem",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 flex items-center justify-center shrink-0 rounded-full"
                style={{ border: "1.5px solid rgba(225,29,72,0.15)", background: "rgba(225,29,72,0.05)" }}
              >
                <PromoIcon size={16} strokeWidth={1.5} style={{ color: "#E11D48" }} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm" style={{ color: "#111827" }}>{d.title}</p>
                <p className="text-xs mt-0.5 leading-snug" style={{ color: "#9CA3AF" }}>{d.desc}</p>
              </div>

              <div
                className="shrink-0 text-sm font-black px-3.5 py-1.5 rounded-full"
                style={{ background: "#E11D48", color: "#fff" }}
              >
                {d.badge}
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* ── Plan cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {p.plans.map((plan, i) => {
            const isCenter = plan.highlight;

            const card = (
              <div
                className="relative flex flex-col"
                style={{
                  borderRadius: "2.5rem",
                  background: isCenter ? "#1E293B" : "#FFFFFF",
                  boxShadow: isCenter ? CARD_SHADOW_DARK : CARD_SHADOW,
                  border: isCenter ? "none" : "1px solid #F1F5F9",
                  padding: "2rem 1.75rem",
                  height: "100%",
                }}
              >
                {/* Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.18em]"
                    style={{ color: isCenter ? "rgba(255,255,255,0.4)" : "#9CA3AF" }}
                  >
                    {plan.tag}
                  </span>
                  {/* Sub as pill on center card */}
                  {isCenter ? (
                    <span
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {plan.sub}
                    </span>
                  ) : (
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: "#D1D5DB" }}
                    >
                      {plan.sub}
                    </span>
                  )}
                </div>

                {/* Plan name */}
                <h3
                  className="font-black text-xl mb-2"
                  style={{ color: isCenter ? "#fff" : "#111827" }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-7">
                  <span
                    className="font-black leading-none"
                    style={{
                      fontSize: "clamp(2.8rem, 5.5vw, 3.5rem)",
                      color: isCenter ? "#fff" : "#111827",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-xl font-bold"
                    style={{ color: isCenter ? "rgba(255,255,255,0.3)" : "#D1D5DB" }}
                  >
                    ₸
                  </span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-1 mb-7">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          background: isCenter ? "rgba(220,38,38,0.3)" : "rgba(220,38,38,0.1)",
                        }}
                      >
                        <Check size={9} strokeWidth={3} style={{ color: isCenter ? "#FCA5A5" : "#DC2626" }} />
                      </span>
                      <span
                        className="text-sm leading-snug"
                        style={{ color: isCenter ? "rgba(255,255,255,0.6)" : "#6B7280" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Gift badge — adapts to dark / light card */}
                {plan.gift && (
                  <div
                    className="flex items-center gap-2 text-xs font-semibold mb-5 px-3.5 py-2.5 rounded-full"
                    style={{
                      background: isCenter ? "rgba(255,255,255,0.08)" : "rgba(225,29,72,0.06)",
                      border: isCenter ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(225,29,72,0.18)",
                      color: isCenter ? "rgba(255,255,255,0.75)" : "#E11D48",
                      width: "fit-content",
                    }}
                  >
                    <span className="relative flex w-2 h-2 shrink-0">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ background: isCenter ? "rgba(255,255,255,0.6)" : "rgba(225,29,72,0.5)" }}
                      />
                      <span
                        className="relative inline-flex rounded-full w-2 h-2"
                        style={{ background: isCenter ? "rgba(255,255,255,0.8)" : "#E11D48" }}
                      />
                    </span>
                    {plan.gift}
                  </div>
                )}

                {/* CTA */}
                <CTA dark={isCenter} label={p.cta} />
              </div>
            );

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ height: "100%" }}
              >
                {isCenter ? (
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ height: "100%" }}
                  >
                    {card}
                  </motion.div>
                ) : (
                  card
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footnote */}
        <p className="text-xs mt-8" style={{ color: "#D1D5DB" }}>
          {p.footnote}
        </p>

      </div>
    </section>
  );
}
