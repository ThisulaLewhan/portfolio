import type { Transition } from "motion/react";

/**
 * One spring vocabulary for the whole site. Critically damped by default;
 * bounce only where a gesture carried momentum into the motion.
 */
export const spring = {
  /** Repositioning things: the nav pill, panels opening. */
  move: { type: "spring", bounce: 0, duration: 0.45 } satisfies Transition,
  /** Small, immediate responses: toggles, highlights. */
  snap: { type: "spring", bounce: 0, duration: 0.3 } satisfies Transition,
  /** After a flick or drag release. */
  momentum: { type: "spring", bounce: 0.18, duration: 0.42 } satisfies Transition,
};

export const fade: Transition = { duration: 0.2, ease: [0.22, 1, 0.36, 1] };
