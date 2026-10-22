"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { mailto, site } from "@/config/site";
import { person } from "@/content/copy";
import { fade, spring } from "@/lib/motion";
import { ChapterTitle } from "./radical";

/**
 * The person behind the business. The portrait sits in the site's
 * ultramarine light until you reach for it, then turns to full colour.
 */
export function Person() {
  const email = site.contact.personalEmail;
  return (
    <section id="person" aria-labelledby="person-title" className="chapter wrap border-t border-hairline">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">{site.portrait.src && <Portrait />}</div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <ChapterTitle label="Person" id="person-title">
            {person.title}
          </ChapterTitle>
          <p className="display mt-10 text-[clamp(2rem,1.4rem+2.4vw,3.6rem)] leading-[0.9] text-ultra-text">{person.lead}</p>
          <div className="mt-8 grid max-w-[54ch] gap-5 text-[1.1rem] leading-relaxed text-bone-dim">
            {person.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {email && (
            <div className="mt-14">
              <h3 className="label">Things you could ask me about</h3>
              <ul className="mt-4 border-t border-hairline">
                {person.starters.map((topic) => (
                  <li key={topic} className="border-b border-hairline">
                    <a
                      href={mailto(email, topic)}
                      className="group flex min-h-14 items-center justify-between gap-4 py-3.5 text-[1.08rem] font-medium transition-colors active:text-ultra-text"
                    >
                      <span>{topic}</span>
                      <span aria-hidden className="text-ash transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-bone">
                        <Arrow />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.9rem] text-ash">Each one opens an email with the topic filled in.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Portrait() {
  const [colour, setColour] = useState(false);
  const reduce = useReducedMotion();
  const t = reduce ? fade : spring.move;

  return (
    <figure className="m-0 lg:sticky lg:top-28">
      <button
        type="button"
        aria-pressed={colour}
        aria-label={colour ? "Show the portrait in the site's blue light" : "Show the portrait in full colour"}
        onClick={() => setColour((c) => !c)}
        onPointerEnter={(e) => e.pointerType === "mouse" && setColour(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setColour(false)}
        className="group relative block aspect-[4/5] w-full max-w-[30rem] overflow-hidden bg-graphite"
      >
        {/* Duotone: greyscale portrait washed in ultramarine */}
        <Image
          src={site.portrait.src}
          alt={site.portrait.alt}
          fill
          sizes="(min-width: 1024px) 34vw, 100vw"
          className="object-cover object-[50%_28%] contrast-[1.15] brightness-[0.82] grayscale"
          priority={false}
        />
        <span aria-hidden className="absolute inset-0 bg-ultra mix-blend-multiply" />
        <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(8,9,12,0.7))]" />
        <motion.span
          aria-hidden
          initial={false}
          animate={{ opacity: colour ? 1 : 0, scale: colour ? 1 : 1.04 }}
          transition={t}
          className="absolute inset-0"
        >
          <Image src={site.portrait.src} alt="" fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover object-[50%_28%]" />
        </motion.span>
        <span className="label absolute bottom-4 left-4 flex items-center gap-2 text-bone">
          <span aria-hidden className={`size-2 transition-colors ${colour ? "bg-bone" : "bg-ultra"}`} />
          {colour ? (
            "In colour"
          ) : (
            <>
              <span className="[@media(hover:hover)]:hidden">Tap for colour</span>
              <span className="hidden [@media(hover:hover)]:inline">Hover for colour</span>
            </>
          )}
        </span>
      </button>
      <figcaption className="mt-4 text-[0.95rem] text-ash">
        {site.name}, {site.location}
      </figcaption>
    </figure>
  );
}

function Arrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
      <path d="M3 9h11M10 4.5 14.5 9 10 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
