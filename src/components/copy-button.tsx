"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { fade, spring } from "@/lib/motion";

/** Copies a value and confirms in place, with the same label it started with. */
export function CopyButton({ value, label, className = "btn btn-line" }: { value: string; label: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const reduce = useReducedMotion();
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2200);
  };

  const text = state === "copied" ? "Copied" : state === "failed" ? "Couldn’t copy, select the address" : label;

  return (
    <button type="button" onClick={copy} data-state={state} className={className}>
      <span aria-hidden className="relative grid size-4 place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          {state === "copied" ? (
            <motion.svg
              key="check"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? fade : spring.snap}
            >
              <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          ) : (
            <motion.svg key="copy" width="16" height="16" viewBox="0 0 16 16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fade}>
              <rect x="5" y="5" width="8.5" height="8.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10.5 3.2V3a.5.5 0 0 0-.5-.5H3.5a1 1 0 0 0-1 1V10a.5.5 0 0 0 .5.5h.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </motion.svg>
          )}
        </AnimatePresence>
      </span>
      <span aria-live="polite">{text}</span>
    </button>
  );
}
