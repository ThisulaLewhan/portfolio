"use client";

import { useEffect } from "react";

/**
 * Shows [data-reveal] elements once as they enter the viewport. Content is
 * only hidden when the html has the "js" class, so without JavaScript (or
 * with reduced motion, via CSS) everything is simply visible.
 */
export function Reveals() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.shown = "";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
