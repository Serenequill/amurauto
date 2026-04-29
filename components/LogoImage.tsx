"use client";

import Image from "next/image";

export default function LogoImage({ size = 48 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src="/logo.png"
        alt="Amur Auto логотип"
        fill
        className="object-contain"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}
