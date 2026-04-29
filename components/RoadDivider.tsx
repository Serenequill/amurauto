export default function RoadDivider() {
  return (
    <div aria-hidden style={{ padding: "0 48px" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{
          fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em",
          textTransform: "uppercase", color: "#D1D5DB", whiteSpace: "nowrap",
          fontFamily: "'SF Mono','Fira Code',monospace",
        }}>
          AMUR·AUTO
        </span>

        <div style={{ flex: 1, display: "flex", gap: "8px", alignItems: "center" }}>
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: "2px", borderRadius: "1px",
              background: i % 2 === 0 ? "#E5E7EB" : "transparent",
            }} />
          ))}
        </div>

        <span style={{
          fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em",
          textTransform: "uppercase", color: "#D1D5DB", whiteSpace: "nowrap",
          fontFamily: "'SF Mono','Fira Code',monospace",
        }}>
          ALM·KZ
        </span>
      </div>
    </div>
  );
}
