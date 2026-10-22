"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { site } from "@/config/site";
import { RADICAL_PATH } from "./radical";

const LINES = [site.firstName.toUpperCase(), site.lastName.toUpperCase()];

/**
 * The opening screen. The name sits under a radical drawn in light, and the
 * visitor's pointer (or finger) is a lamp: it washes the dark stage and
 * catches the lettering where it passes.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { bounce: 0, duration: 0.9 });
  const y = useSpring(rawY, { bounce: 0, duration: 0.9 });

  // Resting position: just above the root of the radical.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const place = () => {
      const r = stage.getBoundingClientRect();
      rawX.jump(r.width * 0.3);
      rawY.jump(r.height * 0.42);
      x.jump(r.width * 0.3);
      y.jump(r.height * 0.42);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [rawX, rawY, x, y]);

  // Keep the lit copy of the name in step with the lamp.
  useEffect(() => {
    const update = () => {
      const stage = stageRef.current;
      const name = nameRef.current;
      if (!stage || !name) return;
      const s = stage.getBoundingClientRect();
      const n = name.getBoundingClientRect();
      name.style.setProperty("--mx", `${x.get() - (n.left - s.left)}px`);
      name.style.setProperty("--my", `${y.get() - (n.top - s.top)}px`);
    };
    update();
    const a = x.on("change", update);
    const b = y.on("change", update);
    return () => {
      a();
      b();
    };
  }, [x, y]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - r.left);
    rawY.set(e.clientY - r.top);
  };

  return (
    <header
      id="top"
      ref={stageRef}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Lamp */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 -z-10 size-[110vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x,
          y,
          background:
            "radial-gradient(circle, rgba(53,80,255,0.26) 0%, rgba(53,80,255,0.1) 22%, rgba(53,80,255,0.03) 40%, transparent 58%)",
        }}
      />
      {/* Vignette keeps the edges of the stage in shadow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(120% 90% at 40% 45%, transparent 40%, rgba(0,0,0,0.65) 100%)" }}
      />

      <div className="wrap flex flex-1 flex-col pt-[clamp(6rem,14vh,9rem)] pb-[clamp(1.75rem,4vh,3rem)]">
        <h1 className="relative flex flex-1 items-center">
          <span className="sr-only">{site.name}</span>
          <span aria-hidden className="relative flex text-[length:min(23vw,30vh)] sm:text-[length:min(20vw,35vh)]">
            {/* The radical: lead-in, drop to the root, long rise */}
            <span className="relative w-[0.5em] flex-none">
              <svg viewBox="0 0 72 100" preserveAspectRatio="none" className="hero-glyph absolute inset-x-0 top-0 h-[calc(100%+0.16em)] w-full overflow-visible">
                <path
                  d={RADICAL_PATH}
                  fill="none"
                  strokeLinejoin="miter"
                  vectorEffect="non-scaling-stroke"
                  style={{ stroke: "var(--ultra)", strokeWidth: "var(--stroke)" }}
                />
              </svg>
              <span className="hero-fade label absolute top-full left-[118%] mt-1 hidden text-[0.95rem] whitespace-nowrap sm:block">
                <span className="text-ultra-text">radix</span>, Latin: root
              </span>
            </span>

            <span className="relative block pt-[0.13em]">
              {/* Vinculum: runs over the name and off the edge of the screen */}
              <span
                className="hero-bar absolute top-0 left-0 h-[var(--stroke)] origin-left -translate-y-1/2 bg-ultra"
                style={{ right: "calc(-100vw)" }}
              />
              <span ref={nameRef} className="relative block">
                <NameLines className="text-[#aaa397]" />
                {/* The lit copy: same letters, revealed only around the lamp */}
                <NameLines
                  className="absolute inset-0 text-white"
                  style={{
                    maskImage: "radial-gradient(circle at var(--mx, -999px) var(--my, -999px), #000 0, rgba(0,0,0,0.55) 1.2em, transparent 2.6em)",
                    WebkitMaskImage:
                      "radial-gradient(circle at var(--mx, -999px) var(--my, -999px), #000 0, rgba(0,0,0,0.55) 1.2em, transparent 2.6em)",
                  }}
                />
              </span>
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-8 border-t border-hairline pt-6 md:grid-cols-12 md:gap-6">
          <ul className="grid gap-1 md:col-span-4" aria-label="Roles">
            {site.roles.map((role, i) => (
              <li key={role} className="flex items-baseline gap-3 text-[1.02rem] font-medium">
                <span aria-hidden className="h-[2px] w-3 translate-y-[-0.3em] bg-ultra" />
                {i === 0 ? (
                  <a href="#skyradix" className="link decoration-ultra-text">
                    {role}
                  </a>
                ) : (
                  role
                )}
              </li>
            ))}
          </ul>
          <p className="lead max-w-[30ch] md:col-span-5">{site.headline}</p>
          <div className="flex flex-wrap items-start gap-3 md:col-span-3 md:justify-end">
            <a href="#about" className="btn">
              Get to know me
              <ArrowDown />
            </a>
            <a href="#skyradix" className="btn btn-ghost">
              Discover Skyradix
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function NameLines({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  let i = 0;
  return (
    <span className={`display block ${className}`} style={style}>
      {LINES.map((line) => (
        <span key={line} className="block overflow-hidden pb-[0.02em]">
          {line.split("").map((ch, k) => (
            <span key={k} className="hero-letter inline-block" style={{ "--i": i++ } as React.CSSProperties}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

function ArrowDown() {
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1.5v10.5M2.5 7.5 7 12l4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
