export function Arrow({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M2.5 8h10.5M9 3.75 13.25 8 9 12.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className = "", size = 14 }: { className?: string; size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M4 3h7v7M11 3 3 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
