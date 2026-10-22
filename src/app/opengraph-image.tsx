import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = "Thisula Lewhan, founder of Skyradix";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "radial-gradient(circle at 30% 45%, #14205e 0%, #08090C 60%)",
          color: "#EDE7DC",
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          <path d="M70 330 L110 310 L170 470 L250 150 H1200" fill="none" stroke="#3550FF" strokeWidth="14" />
        </svg>
        <div style={{ position: "absolute", left: 275, top: 168, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, fontWeight: 800, letterSpacing: -3, lineHeight: 0.9 }}>THISULA</div>
          <div style={{ fontSize: 150, fontWeight: 800, letterSpacing: -3, lineHeight: 0.9 }}>LEWHAN</div>
          <div style={{ fontSize: 34, marginTop: 36, color: "#9A968E" }}>{site.roles.join("   /   ")}</div>
        </div>
      </div>
    ),
    size,
  );
}
