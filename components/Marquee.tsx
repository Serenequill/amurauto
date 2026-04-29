import Image from "next/image";

const COUNT = 10;

export default function Marquee() {
  const items = Array.from({ length: COUNT });

  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid #F1F5F9",
        borderBottom: "1px solid #F1F5F9",
      }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #FFFFFF, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, #FFFFFF, transparent)" }} />

      <div className="flex animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
        {[...items, ...items].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-8">
            <div className="relative w-10 h-10 opacity-20 grayscale">
              <Image src="/logo.webp" alt="АмурАвто" fill className="object-contain" />
            </div>
            <span
              className="font-black uppercase tracking-widest select-none"
              style={{ fontSize: "11px", color: "#E5E7EB", letterSpacing: "0.18em" }}
            >
              AMURAUTO
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
