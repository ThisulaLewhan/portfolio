"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { mailto, site } from "@/config/site";
import { sections, type SectionId } from "@/content/copy";
import { fade, spring } from "@/lib/motion";
import { RADICAL_PATH } from "./radical";

function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);
  // The active section is the last one whose top has passed the reading line.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.42;
      let current: SectionId | null = null;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return active;
}

/**
 * Top bar. Its bottom edge is the vinculum: it fills with the page as you
 * read, so the whole page sits under the root.
 */
export function Nav() {
  const reduce = useReducedMotion();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { bounce: 0, duration: 0.3 });
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const onField = active === "skyradix";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav
        aria-label="Main"
        className={`translucent fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
          scrolled ? (onField ? "bg-field/85 backdrop-blur-xl" : "bg-obsidian/75 backdrop-blur-xl") : "bg-transparent"
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-[-0.01em]">
            <svg aria-hidden viewBox="0 0 72 100" preserveAspectRatio="none" className="h-[18px] w-[14px] overflow-visible">
              <path
                d={RADICAL_PATH}
                fill="none"
                strokeLinejoin="miter"
                vectorEffect="non-scaling-stroke"
                style={{ stroke: onField ? "var(--bone)" : "var(--ultra)", strokeWidth: 2.5 }}
              />
              <path d="M72 0 H 120" fill="none" vectorEffect="non-scaling-stroke" style={{ stroke: onField ? "var(--bone)" : "var(--ultra)", strokeWidth: 2.5 }} />
            </svg>
            <span className="pl-1.5">{site.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {sections.map((s) => {
              const on = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={on ? "location" : undefined}
                    className={`relative block px-3 py-2 text-[0.95rem] transition-colors duration-200 ${
                      on ? "text-bone" : onField ? "text-field-muted hover:text-bone" : "text-ash hover:text-bone"
                    }`}
                    style={{ fontVariationSettings: '"wdth" 88' }}
                  >
                    {s.label}
                    {on && (
                      <motion.span
                        layoutId="nav-mark"
                        transition={reduce ? { duration: 0 } : spring.move}
                        className={`absolute inset-x-3 -bottom-px h-[2px] ${onField ? "bg-bone" : "bg-ultra"}`}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="-mr-3 flex min-h-11 items-center gap-2.5 px-3 font-semibold md:hidden"
          >
            Menu
            <span aria-hidden className="flex w-5 flex-col gap-[5px]">
              <span className="h-[2px] bg-bone" />
              <span className="h-[2px] w-3/5 bg-bone" />
            </span>
          </button>
        </div>
        <motion.div
          aria-hidden
          className={`absolute inset-x-0 bottom-0 h-[2px] origin-left ${onField ? "bg-bone" : "bg-ultra"}`}
          style={{ scaleX: reduce ? scrollYProgress : progress }}
        />
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            transition={fade}
            className="fixed inset-0 z-[70] flex flex-col bg-obsidian"
          >
            <div className="wrap flex h-16 items-center justify-between">
              <span className="font-semibold">{site.name}</span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  menuButtonRef.current?.focus();
                }}
                className="-mr-3 min-h-11 px-3 font-semibold"
              >
                Close
              </button>
            </div>
            <ul className="wrap mt-6 flex-1">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduce ? fade : { ...spring.move, delay: 0.04 * i }}
                  className="border-b border-hairline"
                >
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="display flex min-h-[4.25rem] items-center justify-between py-2 text-[clamp(2.6rem,13vw,4.5rem)] active:text-ultra-text"
                  >
                    {s.label}
                    {active === s.id && <span aria-hidden className="size-3 bg-ultra" />}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="wrap flex flex-wrap gap-x-6 gap-y-2 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] text-ash">
              {site.contact.personalEmail && (
                <a href={mailto(site.contact.personalEmail)} className="link min-h-11 py-2">
                  {site.contact.personalEmail}
                </a>
              )}
              <a href={site.social.linkedin.href} target="_blank" rel="noopener noreferrer" className="link min-h-11 py-2">
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
