"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setIsPointer(!!el?.closest('a, button, [role="button"], [data-cursor="pointer"]'));
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: pos.x - (isPointer ? 22 : 14),
          y: pos.y - (isPointer ? 22 : 14),
          opacity: visible ? 1 : 0,
          scale: isPointer ? 1 : 1,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.5 }}
      >
        {isPointer ? (
          /* ── Crosshair / target ── */
          <div className="relative w-11 h-11">
            <div
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: "#ccff00", boxShadow: "0 0 10px rgba(204,255,0,0.5)" }}
            />
            {/* horizontal */}
            <div className="absolute top-1/2 left-2 right-2 h-px -translate-y-1/2" style={{ background: "rgba(204,255,0,0.7)" }} />
            {/* vertical */}
            <div className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2" style={{ background: "rgba(204,255,0,0.7)" }} />
            {/* center dot */}
            <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ background: "#ccff00" }} />
            {/* corner ticks */}
            {([[-1, -1], [1, -1], [-1, 1], [1, 1]] as [number, number][]).map(([sx, sy], i) => (
              <div
                key={i}
                className="absolute w-2.5 h-2.5"
                style={{
                  top: sy < 0 ? 0 : "auto",
                  bottom: sy > 0 ? 0 : "auto",
                  left: sx < 0 ? 0 : "auto",
                  right: sx > 0 ? 0 : "auto",
                  borderTop: sy < 0 ? "1.5px solid #ccff00" : "none",
                  borderBottom: sy > 0 ? "1.5px solid #ccff00" : "none",
                  borderLeft: sx < 0 ? "1.5px solid #ccff00" : "none",
                  borderRight: sx > 0 ? "1.5px solid #ccff00" : "none",
                }}
              />
            ))}
          </div>
        ) : (
          /* ── Normal ring ── */
          <div
            className="w-7 h-7 rounded-full border flex items-center justify-center"
            style={{ borderColor: "rgba(204,255,0,0.4)" }}
          >
            <div className="w-1 h-1 rounded-full" style={{ background: "#ccff00" }} />
          </div>
        )}
      </motion.div>

      {/* Precise dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full"
        style={{ background: "#ccff00" }}
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          opacity: visible && !isPointer ? 0.8 : 0,
        }}
        transition={{ type: "spring", stiffness: 1200, damping: 60 }}
      />
    </>
  );
}
