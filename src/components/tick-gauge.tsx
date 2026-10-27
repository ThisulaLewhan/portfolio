/**
 * A dial of ticks. GSAP lights them clockwise from 12 o'clock as the Currently
 * section scrolls (see section-motion.tsx); without motion they stay at rest.
 */
export function TickGauge({ count = 72, hook = "tick", inner = 76 }: { count?: number; hook?: string; inner?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 200 200" className="size-full">
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2;
        const [s, c] = [Math.sin(a), Math.cos(a)];
        return (
          <line
            key={i}
            data-g={hook}
            className="gauge-tick"
            x1={(100 + inner * s).toFixed(2)}
            y1={(100 - inner * c).toFixed(2)}
            x2={(100 + 96 * s).toFixed(2)}
            y2={(100 - 96 * c).toFixed(2)}
            strokeWidth="2.2"
            strokeLinecap="round"
            style={{ opacity: 0.14 + 0.34 * (i / count) }}
          />
        );
      })}
    </svg>
  );
}
