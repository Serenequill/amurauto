"use client";

import { useLang } from "@/contexts/LangContext";

/** Если сегодня > 25 — показываем следующий месяц */
function getEnrollMonth(months: readonly string[]): string {
  const now   = new Date();
  const day   = now.getDate();
  const idx   = day > 25
    ? (now.getMonth() + 1) % 12
    :  now.getMonth();
  return months[idx];
}

export default function TopBar() {
  const { t } = useLang();
  const month = getEnrollMonth(t.months);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        height: "36px",
        background: "#0F172A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <a
        href="#groups"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("groups")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="flex items-center gap-3 w-full justify-center px-4"
        style={{ textDecoration: "none" }}
      >
        <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.9)", letterSpacing: "0.01em" }}>
          {t.topBar.text(month)}
        </span>
        <span
          className="hidden sm:inline text-[11px] font-bold px-3 py-0.5 rounded-full"
          style={{ background: "#E11D48", color: "#FFFFFF" }}
        >
          {t.topBar.cta}
        </span>
      </a>
    </div>
  );
}
