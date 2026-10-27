/** Sets the last word of a plain-string heading in the italic serif accent. */
function withAccent(heading: React.ReactNode) {
  if (typeof heading !== "string") return heading;
  const m = heading.match(/^(.*\s)?([^\s.]+)(\.?)$/);
  if (!m) return heading;
  return (
    <>
      {m[1]}
      <em className="accent">{m[2] + m[3]}</em>
    </>
  );
}

/**
 * The Swiss header every section shares: index and label in the left three
 * columns, the heading set from column four. Both reveal together, the
 * heading a beat after its label.
 */
export function SectionHead({
  index,
  label,
  heading,
  id,
  night = false,
  motion = false,
}: {
  index: string;
  label: string;
  heading: React.ReactNode;
  id: string;
  night?: boolean;
  /** GSAP owns this header's entrance (see section-motion.tsx), so the CSS reveal steps aside. */
  motion?: boolean;
}) {
  return (
    <div className="grid-12 gap-y-6">
      <p
        {...(motion ? { "data-g": "label" } : { "data-reveal": "" })}
        className={`t-meta col-span-4 flex gap-3 pt-[0.6em] md:col-span-3 ${night ? "text-night-muted" : "text-ink-2"}`}
      >
        <span className={night ? "text-red" : "text-red-ink"}>{index}</span>
        <span>{label}</span>
      </p>
      <h2
        id={id}
        {...(motion ? { "data-g": "title" } : { "data-reveal": "" })}
        className="t-h2 col-span-4 md:col-span-9"
        style={{ "--d": 70 } as React.CSSProperties}
      >
        {withAccent(heading)}
      </h2>
    </div>
  );
}
