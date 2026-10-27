"use client";

import { useEffect } from "react";

/**
 * Plays the hero entrance again each time the visitor scrolls back up to it. The
 * entrance is plain CSS animation, so replaying means rewinding those animations.
 * It waits until the hero has been scrolled away, then fires once a good part of it
 * is back in view. With reduced motion there are no animations, so nothing happens.
 */
export function HeroReplay() {
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let away = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio < 0.02) away = true;
        else if (away && e.intersectionRatio >= 0.3) {
          away = false;
          for (const a of hero.getAnimations({ subtree: true })) {
            a.currentTime = 0;
            a.play();
          }
        }
      },
      { threshold: [0, 0.02, 0.3] },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return null;
}
