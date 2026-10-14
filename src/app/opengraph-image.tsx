import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { publications } from "@/lib/publications";

export const dynamic = "force-static";
export const alt = `${profile.name}, computational chemistry researcher, University of Chittagong`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Pointy-top hexagon outline centred at (cx, cy). */
function hex(cx: number, cy: number, s: number) {
  const w = (Math.sqrt(3) * s) / 2;
  return `M${cx} ${cy - s}L${cx + w} ${cy - s / 2}L${cx + w} ${cy + s / 2}L${cx} ${cy + s}L${cx - w} ${cy + s / 2}L${cx - w} ${cy - s / 2}Z`;
}

// Link previews in WhatsApp/Messenger use this 1200×630 card.
export default function OpenGraphImage() {
  const s = 56;
  const w = Math.sqrt(3) * s;
  const cells: string[] = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 6; col++) {
      cells.push(hex(760 + col * w + (row % 2 ? w / 2 : 0), -20 + row * 1.5 * s, s));
    }
  }
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #0a1628 0%, #0d1f38 60%, #0b2a3a 100%)",
          color: "#f3f6fb",
          fontFamily: "serif",
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          {cells.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#2dd4bf" strokeOpacity={0.18} strokeWidth={1.5} />
          ))}
          <path d={hex(760 + 2 * w, -20 + 3 * 1.5 * s, s)} fill="none" stroke="#7de3d4" strokeOpacity={0.8} strokeWidth={3} />
          <path d={hex(760 + 3 * w, -20 + 3 * 1.5 * s, s)} fill="none" stroke="#7de3d4" strokeOpacity={0.8} strokeWidth={3} />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", width: 820 }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: "#7de3d4", textTransform: "uppercase", fontFamily: "sans-serif" }}>
            Chemistry · University of Chittagong
          </div>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 1.05, marginTop: 20 }}>{profile.name}</div>
          <div style={{ display: "flex", fontSize: 34, lineHeight: 1.35, marginTop: 24, color: "#dfe7f2" }}>{profile.tagline}</div>
          <div style={{ display: "flex", fontSize: 24, marginTop: 36, color: "#b4c1d4", fontFamily: "sans-serif" }}>
            {`${publications.length} publications · Drug design · Antimicrobials · Solar materials`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
