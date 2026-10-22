"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The radical (√), the site's signature. Skyradix takes its name from radix,
 * the root, and the √ sign is called a radical. The stroke is drawn with a
 * non-scaling width so it stays crisp at any size.
 */
export const RADICAL_PATH = "M0 58 L16 50 L40 100 L72 0";

export function RadicalGlyph({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 72 100" preserveAspectRatio="none" className={`radical-glyph overflow-visible ${className}`}>
      <path
        d={RADICAL_PATH}
        fill="none"
        strokeLinejoin="miter"
        strokeLinecap="butt"
        vectorEffect="non-scaling-stroke"
        style={{ stroke: "var(--ultra)", strokeWidth: "var(--stroke)" }}
      />
    </svg>
  );
}

/** Adds data-in once the element is on screen, so CSS can draw it. */
export function useInViewOnce<T extends HTMLElement>(threshold = 0.4) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/**
 * Text set under a radical: √‾‾‾‾. The bar runs over the text and, with
 * `bleed`, on to the edge of the screen.
 */
export function UnderRoot({
  children,
  className = "",
  bleed = false,
}: {
  children: React.ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>(0.5);
  return (
    <span ref={ref} data-in={inView || undefined} className={`mark relative inline-flex items-stretch ${className}`}>
      <RadicalGlyph className="w-[0.42em] flex-none self-stretch" />
      <span className="relative pt-[0.14em] pl-[0.06em]">
        <span
          aria-hidden
          className={`radical-bar absolute top-0 left-0 h-[var(--stroke)] -translate-y-1/2 bg-ultra ${
            bleed ? "right-[calc(var(--gutter)*-1-100vw)]" : "right-0"
          }`}
        />
        {children}
      </span>
    </span>
  );
}

/** A chapter heading: a small plain label, then the title under a root. */
export function ChapterTitle({
  label,
  id,
  children,
  className = "",
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="label">{label}</p>
      <h2 id={id} className="display mt-5 text-[clamp(3.2rem,1.6rem+6.2vw,7.6rem)]">
        <UnderRoot>{children}</UnderRoot>
      </h2>
    </div>
  );
}
