"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, useScroll } from "motion/react";
import { about } from "@/content/copy";
import { ChapterTitle } from "./radical";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="chapter wrap">
      <ChapterTitle label="About" id="about-title">
        {about.title}
      </ChapterTitle>
      <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12">
        <LitText text={about.manifesto} className="lg:col-span-10 lg:col-start-2" />
        <dl className="grid gap-px overflow-hidden border-y border-hairline bg-hairline sm:grid-cols-3 lg:col-span-10 lg:col-start-2">
          {about.facts.map((f) => (
            <div key={f.label} className="bg-obsidian py-6 sm:px-6 sm:first:pl-0">
              <dt className="label">{f.label}</dt>
              <dd className="mt-2 text-[1.2rem] font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/**
 * A paragraph that lights up word by word as it's read. Scroll-linked, so it
 * follows the reader rather than playing on its own. Without JavaScript, or
 * with reduced motion, it is simply fully lit.
 */
function LitText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.style.setProperty("--p", "1");
      return;
    }
    const set = (v: number) => el.style.setProperty("--p", v.toFixed(4));
    set(scrollYProgress.get());
    return scrollYProgress.on("change", set);
  }, [reduce, scrollYProgress]);

  return (
    <p
      ref={ref}
      className={`text-[clamp(1.75rem,1.1rem+2.6vw,3.6rem)] leading-[1.12] font-medium tracking-[-0.022em] ${className}`}
      style={{ "--p": 1, "--n": words.length } as React.CSSProperties}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="transition-[color] duration-150"
          style={{
            // Each word brightens as the reading line passes it.
            opacity: `clamp(0.18, calc(var(--p) * (var(--n) + 4) - ${i}), 1)`,
          }}
        >
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
