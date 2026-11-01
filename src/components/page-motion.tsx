"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll motion that spans the page rather than one section:
 *   hero     as you scroll away, the portrait drifts up more slowly than the page and
 *            the name fades
 *   footer   its contents slide out from under the contact section as the page ends
 * All of it lives in a no-preference media query: with reduced motion nothing moves.
 */
export function PageMotion() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const hero = document.getElementById("top");
      const figure = hero?.querySelector(".hero-figure");
      const name = hero?.querySelector("#hero-name");
      if (hero && figure && name) {
        gsap
          .timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } })
          .to(figure, { yPercent: 16, ease: "none", duration: 1 }, 0)
          .to(name, { opacity: 0, yPercent: -12, ease: "none", duration: 0.55 }, 0);
      }

      const footer = document.querySelector<HTMLElement>("footer[data-reveal-footer]");
      const inner = footer?.firstElementChild;
      if (footer && inner) {
        gsap.fromTo(
          inner,
          { yPercent: -70, opacity: 0.2 },
          { yPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: footer, start: "top bottom", end: "bottom bottom", scrub: true } },
        );
      }
    });
    return () => mm.revert();
  }, []);

  return null;
}
