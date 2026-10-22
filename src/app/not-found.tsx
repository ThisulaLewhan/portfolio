import Link from "next/link";
import { UnderRoot } from "@/components/radical";

export default function NotFound() {
  return (
    <main id="main" className="wrap flex min-h-[100svh] flex-col justify-center py-20">
      <p className="label">Page not found</p>
      <h1 className="display mt-6 text-[clamp(4rem,14vw,11rem)]">
        <UnderRoot>No root here</UnderRoot>
      </h1>
      <p className="lead mt-8 max-w-[36ch] text-bone-dim">This page doesn&rsquo;t exist. Everything on the site lives on one page.</p>
      <p className="mt-10">
        <Link href="/" className="btn">
          Back to the start
        </Link>
      </p>
    </main>
  );
}
