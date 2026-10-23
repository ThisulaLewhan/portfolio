import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="frame flex min-h-[100svh] flex-col justify-center py-20">
      <div className="grid-12 gap-y-6">
        <p className="t-meta col-span-4 flex gap-3 text-ink-2 md:col-span-3">
          <span className="text-red-ink">404</span>
          <span>Not found</span>
        </p>
        <div className="col-span-4 md:col-span-9">
          <h1 className="t-h2">This page doesn&rsquo;t exist.</h1>
          <p className="mt-6 text-ink-2">Everything on this site lives on a single page.</p>
          <p className="mt-9">
            <Link href="/" className="btn btn-ink">
              Back to the start
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
