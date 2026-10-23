/**
 * The TL monogram, redrawn as vector geometry from the supplied logo files
 * (public/images/logo-dark-mode.png, logo-light-mode.png). The left half
 * takes the current text colour, so it reads white on dark surfaces and
 * ink on light ones; the right half is always the brand red.
 */
export const LOGO_RED = "#E02436";
export const LOGO_INK = "#24272B";

export const LOGO_VIEWBOX = "180 367 1388 1102";
export const LOGO_LEFT = ["180,555 309,367 828,367 828,935 641,803 641,555", "641,929 828,1059 828,1468 641,1337"];
export const LOGO_RIGHT = ["1567,555 1438,367 919,367 919,935 1106,803 1106,555", "1106,929 919,1059 919,1468 1106,1337"];

export function LogoMark({ className = "", label }: { className?: string; label?: string }) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {LOGO_LEFT.map((p) => (
        <polygon key={p} points={p} fill="currentColor" />
      ))}
      {LOGO_RIGHT.map((p) => (
        <polygon key={p} points={p} fill={LOGO_RED} />
      ))}
    </svg>
  );
}
