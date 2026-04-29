"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2.5px",
        background: "linear-gradient(90deg, #E11D48, #FF6B8A)",
        zIndex: 9999,
        boxShadow: "0 0 8px rgba(225,29,72,0.5)",
      }}
    />
  );
}
