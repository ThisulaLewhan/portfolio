import { ImageResponse } from "next/og";
import { LOGO_INK, LOGO_LEFT, LOGO_RED, LOGO_RIGHT, LOGO_VIEWBOX } from "@/components/logo";

export const alt = "Thisula Lewhan, entrepreneur and founder of Skyradix";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The share card is the site icon (white circle, TL monogram) enlarged on a dark ground. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
        }}
      >
        <div
          style={{
            width: 500,
            height: 500,
            borderRadius: 250,
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="312" height="248" viewBox={LOGO_VIEWBOX}>
            {LOGO_LEFT.map((p) => (
              <polygon key={p} points={p} fill={LOGO_INK} />
            ))}
            {LOGO_RIGHT.map((p) => (
              <polygon key={p} points={p} fill={LOGO_RED} />
            ))}
          </svg>
        </div>
      </div>
    ),
    size,
  );
}
