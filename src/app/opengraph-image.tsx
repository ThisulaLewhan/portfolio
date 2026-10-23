import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { LOGO_LEFT, LOGO_RED, LOGO_RIGHT, LOGO_VIEWBOX } from "@/components/logo";

export const alt = "Thisula Lewhan, entrepreneur and founder of Skyradix";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The share card mirrors the hero: dark, an overhead light, the name in white, the monogram. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "radial-gradient(ellipse 60% 70% at 50% 30%, #262626 0%, #0a0a0a 70%)",
          color: "#f7f7f5",
          padding: "64px 72px 60px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="76" height="60" viewBox={LOGO_VIEWBOX}>
            {LOGO_LEFT.map((p) => (
              <polygon key={p} points={p} fill="#ffffff" />
            ))}
            {LOGO_RIGHT.map((p) => (
              <polygon key={p} points={p} fill={LOGO_RED} />
            ))}
          </svg>
          <div style={{ fontSize: 30, color: "#a3a09a" }}>{site.identity}</div>
        </div>
        <div style={{ display: "flex", fontSize: 150, fontWeight: 700, letterSpacing: -7, lineHeight: 0.9 }}>
          {site.firstName}&nbsp;{site.lastName}
          <span style={{ color: LOGO_RED, marginLeft: -12 }}>.</span>
        </div>
      </div>
    ),
    size,
  );
}
