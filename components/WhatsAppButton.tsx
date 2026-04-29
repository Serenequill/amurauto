"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export default function WhatsAppButton() {
  const [tooltip, setTooltip] = useState(true);

  const getLink = () => {
    const text = `Здравствуйте! Хочу записаться в автошколу АмурАвто`;
    return `https://wa.me/77776667096?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-5 z-[999] flex flex-col items-end gap-3">
      {/* Tooltip bubble — hidden on mobile */}
      {tooltip && (
        <div
          className="relative hidden sm:flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium shadow-lg animate-fade-in-up"
          style={{
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            color: "#111827",
            maxWidth: "220px",
          }}
        >
          Запишитесь в WhatsApp!
          <button
            onClick={() => setTooltip(false)}
            className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "#f3f4f6" }}
            aria-label="Закрыть"
          >
            <X size={11} style={{ color: "#6b7280" }} />
          </button>
          {/* Arrow */}
          <div
            className="absolute -bottom-2 right-6 w-4 h-4 rotate-45"
            style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderTop: "none", borderLeft: "none" }}
          />
        </div>
      )}

      {/* Main button */}
      <a
        href={getLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl animate-bounce-soft transition-transform"
        style={{
          background: "#25D366",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
          (e.currentTarget as HTMLElement).style.animation = "none";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "";
          (e.currentTarget as HTMLElement).style.animation = "";
        }}
        onClick={() => setTooltip(false)}
      >
        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          fill="white"
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.494.651 4.84 1.79 6.87L2 30l7.35-1.77A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5c-2.25 0-4.35-.61-6.16-1.67l-.44-.26-4.36 1.05 1.08-4.25-.28-.46A11.46 11.46 0 014.5 16c0-6.34 5.16-11.5 11.5-11.5S27.5 9.66 27.5 16 22.34 27.5 16 27.5zm6.3-8.6c-.35-.17-2.05-1.01-2.37-1.13-.32-.11-.55-.17-.78.17-.23.35-.88 1.13-1.08 1.36-.2.23-.4.26-.74.09-.35-.17-1.47-.54-2.8-1.73-1.04-.92-1.74-2.07-1.94-2.42-.2-.35-.02-.54.15-.71.15-.15.35-.4.52-.59.17-.2.23-.35.35-.58.12-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.57-.28-.68-.57-.59-.78-.6-.2-.01-.43-.01-.66-.01-.23 0-.6.09-.91.43-.32.35-1.2 1.17-1.2 2.86 0 1.68 1.23 3.31 1.4 3.54.17.23 2.42 3.7 5.86 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.05-.84 2.34-1.65.29-.81.29-1.5.2-1.65-.09-.14-.32-.23-.66-.4z" />
        </svg>
      </a>
    </div>
  );
}
