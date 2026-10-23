"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { nav } from "@/content/copy";
import { spring } from "@/lib/motion";

type NavId = (typeof nav)[number]["id"];

/**
 * The section whose top has passed the reading line, and whether the nav is
 * currently floating over the dark Skyradix field.
 */
function useActiveSection(): { active: NavId | null; overDark: boolean; atTop: boolean } {
  const [active, setActive] = useState<NavId | null>(null);
  const [overDark, setOverDark] = useState(false);
  const [atTop, setAtTop] = useState(true);
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current: NavId | null = null;
      for (const item of nav) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      setActive(current);
      const dark = document.getElementById("skyradix")?.getBoundingClientRect();
      setOverDark(!!dark && dark.top <= 44 && dark.bottom >= 44);
      setAtTop(window.scrollY < 8);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return { active, overDark, atTop };
}

/**
 * Two small glass surfaces floating over the page: the name on the left,
 * the sections on the right. A paper-white pill slides to the current
 * section. On phones the right capsule becomes a menu.
 */
export function Nav() {
  const { active, overDark, atTop } = useActiveSection();
  // Lighter at rest at the very top; full glass once content moves beneath.
  const surface = overDark ? "glass-dark text-night-text" : atTop ? "glass glass-rest" : "glass";
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!panelRef.current?.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header className="enter-fade fixed inset-x-0 top-0 z-50">
      <nav aria-label="Main" className="frame flex items-start justify-between pt-4 sm:pt-5">
        <a
          href="#top"
          className={`${surface} flex h-11 items-center gap-2 rounded-full pr-4 pl-3 text-[0.94rem] font-semibold tracking-[-0.015em] transition-colors duration-300`}
        >
          <span aria-hidden className="size-2.5 bg-red" />
          {site.name}
        </a>

        <ul className={`${surface} relative hidden h-11 items-center rounded-full p-1 transition-colors duration-300 md:flex`}>
          {nav.map((item) => {
            const on = active === item.id;
            return (
              <li key={item.id} className="relative">
                {on && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={reduce ? { duration: 0 } : spring.move}
                    className={`absolute inset-0 rounded-full shadow-[0_1px_2px_rgba(22,23,26,0.12),0_0_0_1px_rgba(22,23,26,0.05)] ${overDark ? "bg-white/15" : "bg-white"}`}
                  />
                )}
                <a
                  href={`#${item.id}`}
                  aria-current={on ? "location" : undefined}
                  className={`relative flex h-9 items-center rounded-full px-4 text-[0.92rem] font-medium transition-[color,background-color] duration-200 ${
                    on
                      ? overDark
                        ? "text-night-text"
                        : "text-ink"
                      : overDark
                        ? "text-night-muted hover:bg-white/8 hover:text-night-text"
                        : "text-ink-2 hover:bg-white/55 hover:text-ink"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="relative md:hidden">
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className={`${surface} flex h-11 items-center gap-2.5 rounded-full px-4 text-[0.94rem] font-semibold transition-transform active:scale-[0.97]`}
          >
            {open ? "Close" : "Menu"}
            <span aria-hidden className="relative block h-2.5 w-4">
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${open ? "top-1 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${open ? "top-1 -rotate-45" : "top-2"}`} />
            </span>
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                ref={panelRef}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -4, transition: { duration: 0.15 } }}
                transition={reduce ? { duration: 0.15 } : spring.snap}
                style={{ transformOrigin: "top right" }}
                className="glass absolute top-[calc(100%+0.5rem)] right-0 w-[min(16rem,calc(100vw-2.5rem))] rounded-2xl p-2"
              >
                <ul>
                  {nav.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduce ? { duration: 0 } : { ...spring.snap, delay: 0.03 + i * 0.035 }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={() => setOpen(false)}
                        aria-current={active === item.id ? "location" : undefined}
                        className="flex min-h-12 items-center justify-between rounded-xl px-4 text-[1.05rem] font-medium active:bg-white/70"
                      >
                        {item.label}
                        {active === item.id && <span aria-hidden className="size-1.5 rounded-full bg-red" />}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
