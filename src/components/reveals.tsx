"use client";

import { useEffect } from "react";

/**
 * Shows [data-reveal] elements once as they approach the viewport. Content
 * is only hidden while html has the "js" class, so without JavaScript (or
 * with reduced motion, via CSS) everything is simply visible.
 */
export function Reveals() {
  useEffect(() => {
    const pending = new Set(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])"));
    const show = (el: HTMLElement) => {
      el.dataset.shown = "";
      pending.delete(el);
      io.unobserve(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) show(e.target as HTMLElement);
      },
      // Fire as an element's top crosses ~90% of the viewport height: early
      // enough to finish before it's read, late enough to be seen happening.
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    pending.forEach((el) => io.observe(el));

    // Anything the visitor jumps past (an anchor link, a fast fling) is shown
    // straight away, so nothing above the fold is ever left hidden.
    let frame = 0;
    const sweep = () => {
      frame = 0;
      for (const el of pending) if (el.getBoundingClientRect().bottom < 0) show(el);
      if (pending.size === 0) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return null;
}
