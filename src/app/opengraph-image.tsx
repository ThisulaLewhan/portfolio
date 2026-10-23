import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = "Thisula Lewhan, entrepreneur and founder of Skyradix";
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
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F3F1EC",
          color: "#16171A",
          padding: "64px 72px 56px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34 }}>
          <div style={{ width: 18, height: 18, background: "#D42A1E" }} />
          {site.identity}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 196, fontWeight: 700, letterSpacing: -10, lineHeight: 0.86 }}>
          <div style={{ display: "flex" }}>{site.firstName}</div>
          <div style={{ display: "flex", paddingLeft: 260 }}>
            {site.lastName}
            <span style={{ color: "#D42A1E" }}>.</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
