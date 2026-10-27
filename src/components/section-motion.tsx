"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = "expo.out";
const RULE_EASE = "power3.inOut";

/**
 * GSAP motion for the numbered editorial lists (Approach, Currently). It looks
 * for data-g hooks inside the section with the given id:
 *   label, title   section header (the title rises line by line out of a mask)
 *   intro          lead paragraph; `fill` scrubs it from faint to ink word by word
 *   fade, panel    paragraphs and items that rise in; a frosted panel that settles
 *   circle         the red contact circle (grows in, then drifts)
 *   row            list row (rules draw, number, title and body arrive in turn)
 *   lens           frosted pane that glides to the hovered row (`lens`)
 * `focus` dims rows outside the reading band as you scroll.
 * Everything lives inside a no-preference media query, so with reduced motion
 * (or no JavaScript) the markup stays exactly as it is.
 */
export function SectionMotion({ id, focus = false, lens = false, fill = false }: { id: string; focus?: boolean; lens?: boolean; fill?: boolean }) {
  useEffect(() => {
    const root = document.getElementById(id);
    if (!root) return;
    const all = (hook: string) => gsap.utils.toArray<HTMLElement>(`[data-g="${hook}"]`, root);
    const once = (el: Element, start = "top 88%") => ({ trigger: el, start, once: true });
    const padMasks = (masks: Element[]) =>
      masks.forEach((m) => Object.assign((m as HTMLElement).style, { paddingBlock: "0.12em", marginBlock: "-0.12em" }));

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      all("label").forEach((el) => gsap.from(el, { opacity: 0, y: 12, duration: 0.9, ease: EASE, scrollTrigger: once(el, "top 92%") }));

      all("title").forEach((el) =>
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            padMasks(self.masks);
            return gsap.from(self.lines, { yPercent: 115, duration: 1.15, ease: EASE, stagger: 0.09, scrollTrigger: once(el, "top 90%") });
          },
        }),
      );

      if (fill) {
        all("intro").forEach((el) =>
          SplitText.create(el, {
            type: "words",
            autoSplit: true,
            onSplit(self) {
              return gsap.fromTo(
                self.words,
                { opacity: 0.18 },
                { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 52%", scrub: 0.5 } },
              );
            },
          }),
        );
      }

      // Plain paragraphs, buttons and list items: rise and fade as they arrive.
      // data-g-delay (ms) staggers items that arrive together.
      all("fade").forEach((el) =>
        gsap.from(el, { opacity: 0, y: 22, duration: 1, ease: EASE, delay: Number(el.dataset.gDelay ?? 0) / 1000, scrollTrigger: once(el, "top 92%") }),
      );

      // A frosted panel settles into place: a touch of scale, then its contents follow.
      all("panel").forEach((el) => {
        const inner = gsap.utils.toArray<HTMLElement>(":scope > *", el);
        gsap
          .timeline({ scrollTrigger: once(el, "top 85%"), defaults: { ease: EASE } })
          .from(el, { opacity: 0, y: 64, scale: 0.97, duration: 1.2 })
          .from(inner, { opacity: 0, y: 16, duration: 0.9, stagger: 0.09 }, 0.35);
      });

      // The red circle grows in once, then drifts slowly against the scroll.
      all("circle").forEach((el) => {
        gsap.from(el, { opacity: 0, scale: 0.8, duration: 1.4, ease: EASE, scrollTrigger: once(el, "top 90%") });
        gsap.fromTo(
          el,
          { yPercent: 8 },
          { yPercent: -8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      const rows = all("row");
      rows.forEach((row) => {
        const part = (hook: string) => row.querySelector<HTMLElement>(`[data-g="${hook}"]`);
        const rules = gsap.utils.toArray<HTMLElement>(".rule-draw", row);
        const tl = gsap.timeline({ scrollTrigger: once(row), defaults: { ease: EASE } });
        // The CSS reveal gives .rule-draw a transform transition; it would lag behind GSAP, so switch it off.
        gsap.set(rules, { transition: "none" });
        if (rules.length) tl.from(rules, { scaleX: 0, transformOrigin: "left center", duration: 1.4, ease: RULE_EASE, stagger: 0.08 }, 0);
        const num = part("num");
        if (num) tl.from(num, { opacity: 0, x: -10, duration: 0.8 }, 0.1);
        const title = part("rowtitle");
        if (title) {
          SplitText.create(title, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              padMasks(self.masks);
              return tl.from(self.lines, { yPercent: 115, duration: 1, stagger: 0.07 }, 0.12);
            },
          });
        }
        const media = part("media");
        if (media) tl.from(media, { opacity: 0, y: 14, scale: 0.96, duration: 1 }, 0.1);
        const body = part("body");
        if (body) tl.from(body, { opacity: 0, y: 16, duration: 0.9 }, 0.3);
      });

      if (focus) {
        gsap.set(rows, { opacity: 0.38 });
        rows.forEach((row) =>
          ScrollTrigger.create({
            trigger: row,
            start: "top 64%",
            end: "bottom 40%",
            onToggle: (self) => {
              if (self.isActive) row.setAttribute("data-active", "");
              else row.removeAttribute("data-active");
              gsap.to(row, { opacity: self.isActive ? 1 : 0.38, duration: 0.6, ease: "power2.out", overwrite: true });
            },
          }),
        );
      }

      const pane = lens ? root.querySelector<HTMLElement>('[data-g="lens"]') : null;
      if (pane) {
        const list = pane.parentElement as HTMLElement;
        const to = (row: HTMLElement, instant: boolean) =>
          gsap.to(pane, { y: row.offsetTop + 6, height: row.offsetHeight - 12, opacity: 1, duration: instant ? 0 : 0.6, ease: EASE, overwrite: true });
        mm.add("(hover: hover) and (min-width: 768px)", () => {
          let shown = false;
          const handlers = rows.map((row) => {
            const enter = () => {
              to(row, !shown);
              shown = true;
            };
            row.addEventListener("pointerenter", enter);
            return () => row.removeEventListener("pointerenter", enter);
          });
          const leave = () => {
            shown = false;
            gsap.to(pane, { opacity: 0, duration: 0.4, overwrite: true });
          };
          list.addEventListener("pointerleave", leave);
          return () => {
            handlers.forEach((off) => off());
            list.removeEventListener("pointerleave", leave);
            gsap.set(pane, { clearProps: "all" });
          };
        });
      }
    });

    // Positions depend on the final font metrics.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert();
  }, [id, focus, lens, fill]);

  return null;
}
