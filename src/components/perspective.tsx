"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { perspective } from "@/content/copy";
import { fade, spring } from "@/lib/motion";
import { ChapterTitle, RADICAL_PATH } from "./radical";

/**
 * Four huge words, outlined like unlit signs. Choosing one (hover, tap or
 * arrow keys) lights it, moves the radical to it, and says what it means to me.
 */
export function Perspective() {
  const [active, setActive] = useState<string>(perspective.lenses[0].id);
  const reduce = useReducedMotion();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const current = perspective.lenses.find((l) => l.id === active)!;

  const onKey = (e: React.KeyboardEvent, index: number) => {
    const n = perspective.lenses.length;
    const map: Record<string, number> = {
      ArrowDown: (index + 1) % n,
      ArrowRight: (index + 1) % n,
      ArrowUp: (index - 1 + n) % n,
      ArrowLeft: (index - 1 + n) % n,
      Home: 0,
      End: n - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      const next = perspective.lenses[map[e.key]];
      setActive(next.id);
      tabRefs.current[next.id]?.focus();
    }
  };

  const panel = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={current.id}
        id="lens-panel"
        role="tabpanel"
        aria-labelledby={`lens-${current.id}`}
        initial={reduce ? { opacity: 0 } : { opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.08 } }}
        transition={reduce ? fade : spring.snap}
      >
        <p className="label text-ultra-text">{current.word}</p>
        <p className="lead mt-4 max-w-[34ch]">{current.body}</p>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section id="perspective" aria-labelledby="perspective-title" className="chapter wrap border-t border-hairline">
      <div className="grid gap-10 lg:grid-cols-12">
        <ChapterTitle label="Perspective" id="perspective-title" className="lg:col-span-8">
          {perspective.title}
        </ChapterTitle>
        <p className="lead max-w-[30ch] text-ash lg:col-span-4 lg:self-end">{perspective.intro}</p>
      </div>

      <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
        <div role="tablist" aria-label="Perspectives" aria-orientation="vertical" className="lg:col-span-8">
          {perspective.lenses.map((lens, i) => {
            const on = lens.id === active;
            return (
              <button
                key={lens.id}
                ref={(el) => {
                  tabRefs.current[lens.id] = el;
                }}
                id={`lens-${lens.id}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls="lens-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(lens.id)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(lens.id)}
                onKeyDown={(e) => onKey(e, i)}
                className="group relative flex w-full items-stretch py-[0.06em] text-left text-[clamp(3.4rem,15vw,10.5rem)] lg:text-[clamp(4rem,9.6vw,10.5rem)]"
              >
                <span className="relative w-[0.42em] flex-none">
                  {on && (
                    <motion.svg
                      layoutId="lens-radical"
                      transition={reduce ? { duration: 0 } : spring.move}
                      aria-hidden
                      viewBox="0 0 72 100"
                      preserveAspectRatio="none"
                      className="absolute inset-y-[0.08em] left-0 w-[0.36em] overflow-visible"
                    >
                      <path
                        d={RADICAL_PATH}
                        fill="none"
                        strokeLinejoin="miter"
                        vectorEffect="non-scaling-stroke"
                        style={{ stroke: "var(--ultra)", strokeWidth: "var(--stroke)" }}
                      />
                    </motion.svg>
                  )}
                </span>
                <span
                  className={`display relative block pt-[0.1em] transition-[color,-webkit-text-stroke-color] duration-300 ${
                    on ? "text-bone" : "display-outline group-hover:[-webkit-text-stroke-color:var(--bone-dim)]"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute top-[0.08em] left-0 right-0 h-[var(--stroke)] origin-left -translate-y-1/2 bg-ultra transition-transform duration-500 ease-[var(--ease-out)] ${
                      on ? "scale-x-100 delay-200" : "scale-x-0"
                    }`}
                  />
                  {lens.word}
                </span>
              </button>
            );
          })}
        </div>
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">{panel}</div>
        </div>
      </div>
    </section>
  );
}
