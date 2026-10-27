"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = "expo.out";
const RULE_EASE = "power3.inOut";
const RED = "#e02436";

/**
 * Currently: the dial. Lights its ticks as the stage scrolls and brings each focus area into
 * focus in turn. Desktop only: phones get setupMinis instead. Returns a cleanup that restores the
 * server-rendered markup.
 */
function setupGauge(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-g="stage"]');
  if (!stage) return;
  const ticks = gsap.utils.toArray<SVGElement>('[data-g="tick"]', stage);
  const steps = gsap.utils.toArray<HTMLElement>('[data-g="step"]', stage);
  const num = stage.querySelector<HTMLElement>('[data-g="gauge-num"]');
  const label = stage.querySelector<HTMLElement>('[data-g="gauge-label"]');
  const rest = { num: num?.textContent ?? "", label: label?.textContent ?? "", tick: ticks.map((t) => t.style.opacity) };
  const total = String(steps.length).padStart(2, "0");
  const dim = 0.28; // opacity of the steps out of focus
  let active = -1;

  const render = (p: number) => {
    const lit = p * ticks.length;
    ticks.forEach((t, i) => {
      const d = lit - i;
      if (d > 0) {
        t.style.stroke = RED;
        // Bright at the head, easing off along the trail.
        t.style.opacity = String(Math.max(0.4, 1 - d / (ticks.length * 0.55)));
      } else {
        t.style.stroke = "";
        t.style.opacity = rest.tick[i];
      }
    });
    const now = Math.min(steps.length - 1, Math.floor(p * steps.length));
    if (now === active) return;
    active = now;
    steps.forEach((s, i) => gsap.to(s, { opacity: i === now ? 1 : dim, duration: 0.5, overwrite: true }));
    if (num) {
      num.textContent = String(now + 1).padStart(2, "0");
      gsap.fromTo(num, { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: EASE, overwrite: true });
    }
    if (label) label.textContent = `of ${total}`;
  };

  render(0);
  ScrollTrigger.create({
    trigger: stage,
    scrub: 0.4,
    pin: true,
    start: "center center",
    end: "+=230%",
    onUpdate: (s) => render(s.progress),
  });

  return () => {
    ticks.forEach((t, i) => {
      t.style.stroke = "";
      t.style.opacity = rest.tick[i];
    });
    steps.forEach((s) => gsap.set(s, { clearProps: "opacity" }));
    if (num) num.textContent = rest.num;
    if (label) label.textContent = rest.label;
  };
}

/**
 * Currently on phones: no pinning. Each focus area has its own small dial that fills red as
 * that row scrolls through the screen, so everything stays readable while the motion plays.
 */
function setupMinis(root: HTMLElement) {
  const steps = gsap.utils.toArray<HTMLElement>('[data-g="step"]', root);
  const triggers: ScrollTrigger[] = [];
  const reset: (() => void)[] = [];
  steps.forEach((step) => {
    const ticks = gsap.utils.toArray<SVGElement>('[data-g="mini-tick"]', step);
    if (!ticks.length) return;
    const rest = ticks.map((t) => t.style.opacity);
    const render = (p: number) =>
      ticks.forEach((t, i) => {
        const d = p * ticks.length - i;
        t.style.stroke = d > 0 ? RED : "";
        t.style.opacity = d > 0 ? String(Math.max(0.45, 1 - d / (ticks.length * 0.6))) : rest[i];
      });
    triggers.push(ScrollTrigger.create({ trigger: step, start: "top 82%", end: "bottom 45%", scrub: 0.3, onUpdate: (s) => render(s.progress) }));
    reset.push(() =>
      ticks.forEach((t, i) => {
        t.style.stroke = "";
        t.style.opacity = rest[i];
      }),
    );
  });
  return () => {
    triggers.forEach((t) => t.kill());
    reset.forEach((f) => f());
  };
}

/**
 * GSAP motion for the sections below the hero. It looks for data-g hooks inside
 * the section with the given id:
 *   label, title   section header (the title rises line by line out of a mask)
 *   intro          lead paragraph; `fill` scrubs it from faint to ink word by word
 *   fade, panel    paragraphs and items that rise in; a frosted panel that settles
 *   circle         the red contact circle (grows in, then drifts)
 *   glow           ambient light that drifts against the scroll
 *   card           a card that tips up out of the dark as it scrolls in
 *   row            list row (rules draw, number, title and body arrive in turn)
 *   stage          the Currently dial: pins on desktop, lights its ticks with scroll
 *                  and brings each data-g="step" into focus in turn
 * Elements with data-tilt lean toward the pointer, with a light that follows it.
 * Everything lives inside a no-preference media query, so with reduced motion
 * (or no JavaScript) the markup stays exactly as it is.
 */
export function SectionMotion({ id, fill = false }: { id: string; fill?: boolean }) {
  useEffect(() => {
    const root = document.getElementById(id);
    if (!root) return;
    const all = (hook: string) => gsap.utils.toArray<HTMLElement>(`[data-g="${hook}"]`, root);
    const once = (el: Element, start = "top 88%") => ({ trigger: el, start, once: true });
    const padMasks = (masks: Element[]) =>
      masks.forEach((m) => Object.assign((m as HTMLElement).style, { paddingBlock: "0.12em", marginBlock: "-0.12em", paddingRight: "0.08em", marginRight: "-0.08em" }));

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

      all("glow").forEach((el) =>
        gsap.fromTo(el, { yPercent: -25 }, { yPercent: 25, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } }),
      );

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

    });

    // Cards tip up out of the dark, scrubbed to the scroll. Desktop: the three arrive together, a beat
    // apart, triggered by the list (ScrollTrigger measures with a card's start transform applied, so
    // the trigger itself must not be transformed). Phones: the cards are stacked, so each one animates
    // on its own as it reaches the screen, one after another.
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
      const cards = all("card");
      if (!cards.length) return;
      gsap.fromTo(
        cards,
        { rotationX: 48, rotationZ: (i) => (i % 2 ? 6 : -6), y: 90, scale: 0.88, opacity: 0, transformPerspective: 1100, transformOrigin: "50% 100%" },
        {
          rotationX: 0,
          rotationZ: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          duration: 1,
          stagger: 0.2,
          scrollTrigger: { trigger: cards[0].parentElement, start: "top 94%", end: "top 48%", scrub: 1.1 },
        },
      );
    });
    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)", () => {
      all("card").forEach((li) => {
        const card = li.firstElementChild;
        if (!card) return;
        gsap.fromTo(
          card,
          { rotationX: 28, y: 70, scale: 0.94, opacity: 0, transformPerspective: 900, transformOrigin: "50% 100%" },
          {
            rotationX: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: li, start: "top 92%", end: "top 58%", scrub: 0.9 },
          },
        );
      });
    });

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => setupGauge(root));
    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)", () => setupMinis(root));

    // Pointer: panels and cards lean toward the cursor, lit by a light that follows it.
    mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
      const off: (() => void)[] = [];
      root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        gsap.set(el, { transformPerspective: 900 });
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry((px - 0.5) * 10);
          rx(-(py - 0.5) * 8);
          el.style.setProperty("--mx", `${px * 100}%`);
          el.style.setProperty("--my", `${py * 100}%`);
          el.style.setProperty("--spot", "1");
        };
        const leave = () => {
          rx(0);
          ry(0);
          el.style.setProperty("--spot", "0");
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        off.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
          gsap.set(el, { clearProps: "rotationX,rotationY,transformPerspective" });
        });
      });
      return () => off.forEach((f) => f());
    });

    // Positions depend on the final font metrics.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert();
  }, [id, fill]);

  return null;
}
