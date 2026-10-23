/**
 * The Swiss header every section shares: index and label in the left three
 * columns, the heading set from column four.
 */
export function SectionHead({
  index,
  label,
  heading,
  id,
  night = false,
}: {
  index: string;
  label: string;
  heading: React.ReactNode;
  id: string;
  night?: boolean;
}) {
  return (
    <div className="grid-12 gap-y-6">
      <p className={`t-meta col-span-4 flex gap-3 pt-[0.6em] md:col-span-3 ${night ? "text-night-muted" : "text-ink-2"}`}>
        <span className={night ? "text-red" : "text-red-ink"}>{index}</span>
        <span>{label}</span>
      </p>
      <h2 id={id} data-reveal className="t-h2 col-span-4 md:col-span-9">
        {heading}
      </h2>
    </div>
  );
}
