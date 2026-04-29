"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const registerEl = document.getElementById("register");
      const registerTop = registerEl ? registerEl.getBoundingClientRect().top + scrollY - 100 : Infinity;
      setVisible(scrollY > 360 && scrollY < registerTop);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-3"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid #F1F5F9",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.07)",
        transform: visible ? "translateY(0)" : "translateY(110%)",
        transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
      }}
    >
      <div className="flex gap-2">
        <a
          href="#register"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #FF2D61 0%, #E11D48 50%, #BE123C 100%)",
            boxShadow: "0 6px 18px rgba(225,29,72,0.35)",
          }}
        >
          Записаться на обучение
        </a>
        <a
          href="tel:87776667096"
          className="w-14 flex items-center justify-center rounded-2xl shrink-0"
          style={{
            background: "transparent",
            border: "1.5px solid #E11D48",
            color: "#E11D48",
          }}
          aria-label="Позвонить"
        >
          <Phone size={18} />
        </a>
      </div>
    </div>
  );
}
