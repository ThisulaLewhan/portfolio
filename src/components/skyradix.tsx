"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { mailto, site } from "@/config/site";
import { skyradix } from "@/content/copy";
import { fade, spring } from "@/lib/motion";
import { CopyButton } from "./copy-button";
import { useInViewOnce } from "./radical";

/**
 * The "sky": the one full-bleed field of colour on the site. The company name
 * splits into its two roots when it comes into view, and can be put back
 * together.
 */
export function Skyradix() {
  const { businessEmail, businessContactPage, businessWhatsApp } = site.contact;
  return (
    <section
      id="skyradix"
      aria-labelledby="skyradix-title"
      className="on-field chapter relative overflow-hidden bg-field text-bone"
    >
      {/* A quiet horizon: the field deepens toward the bottom */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 35%, rgba(8,9,12,0.38) 100%)" }} />

      <div className="wrap relative">
        <p className="label text-field-muted">{skyradix.label}</p>
        <SplitName />

        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="lead max-w-[34ch]">{skyradix.intro}</p>
            <p className="mt-8 max-w-[34ch] text-field-muted">
              In its own words:{" "}
              <span className="text-bone">&ldquo;{site.skyradix.tagline}&rdquo;</span>
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="label text-field-muted">What Skyradix does</h3>
            <ul className="mt-5 border-t border-bone/20">
              {skyradix.services.map((s) => (
                <li key={s} className="border-b border-bone/20 py-3 text-[1.08rem]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 grid gap-10 border-t-[length:var(--stroke)] border-bone pt-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="display text-[clamp(2.6rem,1.6rem+3.6vw,5rem)]">Have something to build?</h3>
            <p className="mt-5 max-w-[36ch] text-field-muted">
              Tell Skyradix what you&rsquo;re trying to build or fix. A few lines about the problem is enough to start.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-5 lg:col-start-8">
            {businessEmail && (
              <a href={mailto(businessEmail, "Project enquiry")} className="btn btn-bone justify-between">
                Email Skyradix
                <span className="truncate text-[0.88rem] font-normal opacity-70">{businessEmail}</span>
              </a>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              {businessWhatsApp && (
                <a href={businessWhatsApp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost justify-center">
                  WhatsApp
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {businessEmail && <CopyButton value={businessEmail} label="Copy email" className="btn btn-ghost justify-center" />}
            </div>
            <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[0.95rem]">
              {businessContactPage && (
                <ExternalLink href={businessContactPage}>Contact page</ExternalLink>
              )}
              <ExternalLink href={site.skyradix.url}>skyradix.com</ExternalLink>
              <ExternalLink href={site.skyradix.linkedin}>LinkedIn</ExternalLink>
              <ExternalLink href={site.skyradix.instagram}>Instagram</ExternalLink>
            </p>
          </div>
        </div>
        <p className="mt-14 text-[0.92rem] text-field-muted">
          Skyradix is its own business. For anything that isn&rsquo;t a project,{" "}
          <a href="#contact" className="link text-bone">
            reach me directly
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function SplitName() {
  const reduce = useReducedMotion();
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.6);
  const [split, setSplit] = useState(false);

  // Split once, shortly after the name comes into view.
  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setSplit(true), reduce ? 0 : 350);
    return () => window.clearTimeout(t);
  }, [inView, reduce]);

  const t = reduce ? fade : spring.move;
  const [sky, radix] = skyradix.meaning;

  return (
    <div ref={ref} className="mt-6">
      <h2 id="skyradix-title" className="display flex items-start text-[clamp(4.2rem,19vw,19rem)] leading-[0.8]">
        <span className="sr-only">Skyradix</span>
        <span aria-hidden className="flex flex-col">
          <span>Sky</span>
          <motion.span
            initial={false}
            animate={{ opacity: split ? 1 : 0, y: split ? 0 : -8 }}
            transition={{ ...t, delay: split ? 0.15 : 0 }}
            className="label mt-4 text-[clamp(0.85rem,0.7rem+0.5vw,1.05rem)] text-field-muted normal-case"
          >
            {sky.part}: {sky.gloss.toLowerCase()}
          </motion.span>
        </span>
        <motion.span aria-hidden initial={false} animate={{ width: split ? "0.32em" : "0em" }} transition={t} className="relative block self-stretch">
          <motion.span
            initial={false}
            animate={{ scaleY: split ? 1 : 0 }}
            transition={{ ...t, delay: split ? 0.1 : 0 }}
            className="absolute top-[0.06em] left-1/2 h-[0.68em] w-[var(--stroke)] origin-top -translate-x-1/2 bg-bone/70"
          />
        </motion.span>
        <span aria-hidden className="flex flex-col">
          <span>Radix</span>
          <motion.span
            initial={false}
            animate={{ opacity: split ? 1 : 0, y: split ? 0 : -8 }}
            transition={{ ...t, delay: split ? 0.22 : 0 }}
            className="label mt-4 text-[clamp(0.85rem,0.7rem+0.5vw,1.05rem)] text-field-muted normal-case"
          >
            {radix.part}: {radix.gloss.toLowerCase()}
          </motion.span>
        </span>
      </h2>
      <p className="sr-only">
        {sky.part}: {sky.gloss}. {radix.part}: {radix.gloss}.
      </p>
      <button
        type="button"
        aria-pressed={split}
        onClick={() => setSplit((s) => !s)}
        className="label mt-6 inline-flex min-h-11 items-center gap-2 text-field-muted transition-colors hover:text-bone"
      >
        <span aria-hidden className="inline-block size-2 bg-current" />
        {split ? "Put the name back together" : "What the name means"}
      </button>
    </div>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
